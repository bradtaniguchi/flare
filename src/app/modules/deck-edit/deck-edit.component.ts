import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, mergeMap, share, take, tap, shareReplay } from 'rxjs/operators';
import { AppState } from 'src/app/app-store/app-state';
import { logger } from 'src/app/core/logger';
import { DeckFormService } from 'src/app/core/services/deck-form/deck-form.service';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { GroupService } from 'src/app/core/services/group/group.service';
import { Deck } from 'src/app/models/deck';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-deck-edit',
  template: `
    <div class="view-container-padding">
      <ng-container *ngIf="(deck$ | async) as deck">
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
              [group]="group$ | async"
              [control]="form.get('group')"
            >
            </app-group-list-field>
          </section>
          <!--<section>
            <app-form-section-header
              header="Cards"
              description="Update cards for this deck"
            >
            </app-form-section-header>
          </section>-->
          <section fxLayout="row" fxLayoutAlign="end">
            <button type="button" mat-button (click)="back()">Back</button>
            <button type="submit" mat-button color="primary">Save</button>
          </section>
        </form>
      </ng-container>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckEditComponent implements OnInit {
  public deck$: Observable<Deck>;
  public form: FormGroup;
  public groups$: Observable<Group[]>;
  public group$: Observable<Group>;
  public user: User;
  constructor(
    private store: Store<AppState>,
    private deckService: DeckService,
    private groupService: GroupService,
    private location: Location,
    private route: ActivatedRoute,
    private deckForm: DeckFormService
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.data.user;
    logger.log('in deck-edit');
    this.deck$ = this.observeDeck();
    this.groups$ = this.observeGroups();
    this.group$ = this.observeGroup(this.deck$, this.groups$);
    this.deck$.pipe(take(1)).subscribe(deck => {
      this.form = this.buildForm(deck);
      logger.log('test with form:', this.form);
    });
  }

  public back() {
    this.location.back();
  }

  public submit(event: Event, form: FormGroup) {
    logger.log('form: ', form);
    if (form.valid) {
      this.deckService.update(form.value).subscribe(() => this.location.back());
    }
  }

  private observeDeck(): Observable<Deck> {
    return this.route.params.pipe(
      map(data => data.deckId),
      mergeMap(deckId => this.deckService.get({ deckId, user: this.user })),
      shareReplay(1)
    );
  }

  private observeGroups(): Observable<Group[]> {
    return this.groupService
      .listUserGroups({ user: this.user })
      .pipe(shareReplay(1));
  }

  private observeGroup(
    deck: Observable<Deck>,
    groups: Observable<Group[]>
  ): Observable<Group> {
    return combineLatest(deck, groups).pipe(
      map(([deck, groups]) => groups.find(group => group.uid === deck.group))
    );
  }

  private buildForm(deck: Deck): FormGroup {
    const form = this.deckForm.form(deck);
    form.patchValue(deck);
    return form;
  }
}
