import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { SetLoading } from 'src/app/app-store/loading/loading.actions';
import { Notify } from 'src/app/app-store/notify/notify.actions';
import { logger } from 'src/app/core/logger';
import { CardService } from 'src/app/core/services/card/card.service';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { GroupService } from 'src/app/core/services/group/group.service';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { CreateCardForm } from './create-card-form';

@Component({
  selector: 'app-card-create',
  template: `
    <div class="view-container-padding">
      <form [formGroup]="form" (submit)="submit($event, form)">
        <section fxLayout="column">
          <app-card-front
            [card]="card"
            [control]="form.get('front')"
          ></app-card-front>
          <app-card-back
            [card]="card"
            [control]="form.get('back')"
          ></app-card-back>
          <app-group-list-field
            [groups]="groups$ | async"
            [control]="form.get('group')"
          ></app-group-list-field>
          <app-deck-list-field
            [decks]="decks$ | async"
            [control]="form.get('deck')"
          ></app-deck-list-field>
        </section>
        <section fxLayout="row" fxLayoutAlign="end">
          <button type="button" mat-button (click)="back()">Back</button>
          <button type="submit" mat-button color="primary">Submit</button>
        </section>
      </form>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCreateComponent implements OnInit, OnDestroy {
  public card: Partial<Card> = {};
  public groups$: Observable<Group[]>;
  public decks$: Observable<Deck[]>;
  public loading$: Observable<boolean>;
  public form: FormGroup;

  private user: User;
  private takeUntil = new Subject();
  constructor(
    private location: Location,
    private cardService: CardService,
    private groupService: GroupService,
    private deckService: DeckService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // used resolve value from resolver
    this.user = this.route.snapshot.data.user;

    this.form = this.buildForm();
    this.groups$ = this.observeGroups();

    this.form
      .get('group')
      .valueChanges.pipe(takeUntil(this.takeUntil))
      .subscribe((group: Group) =>
        !!group
          ? this.form.get('deck').enable()
          : this.form.get('deck').disable()
      );
    this.decks$ = this.observeDecks();
  }

  ngOnDestroy() {
    this.takeUntil.next();
    this.takeUntil.unsubscribe();
  }
  /**
   * Builds the main formGroup to create a card
   */
  private buildForm(): FormGroup {
    return this.fb.group({
      front: this.fb.control('', [Validators.required]),
      back: this.fb.control('', [Validators.required]),
      group: this.fb.control(undefined, [Validators.required]),
      deck: this.fb.control(undefined, [Validators.required])
    });
  }

  /**
   * Observes the groups form the state, by default we set the
   * group to be the same as the current user id (this is the default group)
   */
  private observeGroups(): Observable<Group[]> {
    return this.groupService
      .listUserGroups({
        user: this.user
      })
      .pipe(tap((groups: Group[]) => this.setDefaultGroup(groups)));
  }
  /**
   * Sets the default group, if one isn't already selected
   * @param user the user, used to select the "default" group
   */
  private setDefaultGroup(groups: Group[]): void {
    const formControl = this.form.get('group');
    if (!formControl.value) {
      const group = groups.find(_group => _group.uid === this.user.uid);
      formControl.setValue(group);
    }
  }
  /**
   * Returns the observable for the decks, based upon the currently selected group
   */
  private observeDecks(): Observable<Deck[]> {
    return this.form.get('group').valueChanges.pipe(
      switchMap((group: Group) =>
        group
          ? this.deckService.list({
              user: this.user,
              queryFn: ref => ref.where('group', '==', group.uid)
            })
          : of([])
      ),
      tap(decks => this.setDefaultDeck(decks))
    );
  }
  /**
   * Sets the default deck, if there isn't one already selected
   */
  private setDefaultDeck(decks: Deck[]): void {
    const formControl = this.form.get('deck');
    if (!formControl.value) {
      const deck = decks.find(_deck => _deck.uid === this.user.uid);
      formControl.setValue(deck);
    }
  }

  back() {
    this.location.back();
  }

  submit(event: Event, form: FormGroup) {
    if (form.valid) {
      logger.log('event:', event, 'form:', form);
      this.store.dispatch(new SetLoading(true));
      this.cardService
        .create(form.value as CreateCardForm, this.user)
        .pipe(take(1))
        .subscribe(
          () => {
            this.store.dispatch(
              new Notify({
                message: 'Successfully created card'
              })
            );
            this.router.navigate(['/']);
          },
          () =>
            this.store.dispatch(
              new Notify({
                message: 'Error creating card'
              })
            ),
          () => this.store.dispatch(new SetLoading(false))
        );
    }
  }
}
