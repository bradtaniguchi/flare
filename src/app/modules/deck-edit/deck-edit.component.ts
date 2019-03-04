import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AppState } from 'src/app/app-store/app-state';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { logger } from 'src/app/core/logger';
import { Observable, of } from 'rxjs';
import { Deck } from 'src/app/models/deck';
import { map, tap, mergeMap, take, share } from 'rxjs/operators';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/core/services/group/group.service';
import { Location } from '@angular/common';
import { DeckFormService } from 'src/app/core/services/deck-form/deck-form.service';
import { SetLoading } from 'src/app/app-store/loading/loading.actions';

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
    this.deck$
      .pipe(take(1))
      .subscribe(deck => (this.form = this.buildForm(deck)));
  }

  public back() {
    this.location.back();
  }

  public submit(event: Event, form: FormGroup) {
    logger.log('form: ', form);
    if (form.valid) {
      logger.log('updating form', form);
      // this.deckService.update(form.value);
    }
  }

  private observeDeck(): Observable<Deck> {
    return this.route.params.pipe(
      map(data => data.deckId),
      mergeMap(deckId => this.deckService.get({ deckId, user: this.user })),
      share()
    );
  }

  private observeGroups(): Observable<Group[]> {
    return this.groupService.listUserGroups({ user: this.user });
  }

  private buildForm(deck): FormGroup {
    return this.deckForm.form(deck);
  }
}
