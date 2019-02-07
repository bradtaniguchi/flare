import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { SetLoading } from 'src/app/app-store/loading/loading.actions';
import { Notify } from 'src/app/app-store/notify/notify.actions';
import { logger } from 'src/app/core/logger';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { GroupService } from 'src/app/core/services/group/group.service';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { CreateDeckForm } from './create-deck-form';

@Component({
  selector: 'app-deck-create',
  template: `
    <div class="view-container-padding">
      <form [formGroup]="form" (submit)="submit($event, form)">
        <section fxLayout="column">
          <app-deck-name [control]="form.get('name')" [deck]="deck">
          </app-deck-name>
          <app-deck-description
            [control]="form.get('description')"
            [deck]="deck"
          >
          </app-deck-description>
          <app-group-list-field
            [groups]="groups$ | async"
            [control]="form.get('group')"
          ></app-group-list-field>
        </section>
        <section>
          <div fxLayout="row" fxLayoutAlign="start center">
            <div class="mat-subheading-2 no-margin" style="margin: 0">
              Cards
            </div>
            <div class="mat-body" style="margin-left: 4px">
              Create cards now or later
            </div>
          </div>
          <!--add dynamic list of card-forms-->
          <ng-container
            *ngFor="let formGroup of cardControls"
            [formGroup]="formGroup"
          >
            <app-deck-create-card
              [card]="formGroup.value"
              [formGroup]="formGroup"
              (remove)="removeCard($event)"
            >
            </app-deck-create-card>
          </ng-container>
          <ng-container *ngIf="cardControls.length === 0">
            <div class="mat-body-1">
              No Cards will be created with the deck, you can add them later.
            </div>
          </ng-container>
          <div>
            <button
              type="button"
              class="full-width"
              mat-button
              (click)="addCard()"
            >
              Add Card
            </button>
          </div>
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
export class DeckCreateComponent implements OnInit {
  public deck = {};
  public form: FormGroup;
  public groups$: Observable<Group[]>;
  public user: User;
  public cardControls: FormGroup[];
  constructor(
    private store: Store<AppState>,
    private groupService: GroupService,
    private deckService: DeckService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user;

    this.form = this.buildForm();
    this.cardControls = (this.form.get('cards') as FormArray)
      .controls as FormGroup[];
    this.groups$ = this.observeGroups();
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      group: this.fb.control(undefined, [Validators.required]),
      cards: this.fb.array([this.createCardGroup()])
    });
  }

  private createCardGroup(): FormGroup {
    return this.fb.group({
      front: this.fb.control('', [Validators.required]),
      back: this.fb.control('', [Validators.required])
    });
  }
  /**
   * Observes the groups form the state, by default we set the
   * group to be the same as the current user id (this is the default group)
   */
  private observeGroups(): Observable<Group[]> {
    return this.groupService
      .listUserGroups({ user: this.user })
      .pipe(tap((groups: Group[]) => this.setDefaultGroup(groups)));
  }
  /**
   * Sets the default group, if one isn't already selected
   * @param user the user, used to select the "default" group
   */
  private setDefaultGroup(groups: Group[]) {
    const formControl = this.form.get('group');
    if (!formControl.value) {
      const group = groups.find(_group => _group.uid === this.user.uid);
      formControl.setValue(group);
    }
  }

  back() {
    this.location.back();
  }

  addCard() {
    const cards = this.form.get('cards') as FormArray;
    cards.push(this.createCardGroup());
  }
  /**
   * Removes the given group from the list of cards, so this
   * card will not be created
   * @param group the formGroup for the card we are to remove
   */
  removeCard(group: FormGroup) {
    const cards = this.form.get('cards') as FormArray;
    const index = cards.controls.indexOf(group);
    if (index > -1) {
      cards.removeAt(index);
    }
  }

  submit(event: Event, form: FormGroup) {
    if (form.valid) {
      logger.log('test with form:', form);
      this.store.dispatch(new SetLoading(true));
      this.deckService
        .create(form.value as CreateDeckForm, this.user)
        .pipe(take(1))
        .subscribe(
          () => {
            this.store.dispatch(
              new Notify({ message: 'Successfully created deck' })
            );
            this.router.navigate(['/']);
          },
          () =>
            this.store.dispatch(new Notify({ message: 'Error creating deck' })),
          () => this.store.dispatch(new SetLoading(false))
        );
    }
  }
}
