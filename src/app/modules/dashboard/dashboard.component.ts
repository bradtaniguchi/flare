import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app-state';
import { SearchRecentCards } from 'src/app/app-store/card/card.actions';
import { SearchDecks } from 'src/app/app-store/deck/deck.actions';
import { Card } from 'src/app/models/card';
import { Deck } from 'src/app/models/deck';
import { getRecentCards } from 'src/app/app-store/card/card.reducer';
import { getDecks, getUserDecks } from 'src/app/app-store/deck/deck.reducer';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  template: `
    <div
      fxLayout="row"
      class="full-height view-container-padding"
      fxLayoutAlign="space-between"
    >
      <!-- first column-->
      <section fxFlex="50" class="margin">
        <div>
          <!-- list of all decks -->
          <app-spinner-container [loading]="decksLoading$">
            <mat-card
              *ngIf="(decks$ | async) as decks"
              class="margin-top-bottom"
            >
              <ng-container *ngIf="!decks.length">
                <p>No Decks, please create one by clicking on the right</p>
              </ng-container>
              <app-dashboard-deck *ngFor="let deck of decks" [deck]="deck">
              </app-dashboard-deck>
            </mat-card>
          </app-spinner-container>
        </div>
        <div>
          <!-- list of decks the user created -->
          <app-spinner-container [loading]="decksLoading$">
            <mat-card
              *ngIf="(userDecks$ | async) as decks"
              class="margin-top-bottom"
            >
              <ng-container *ngIf="!decks.length">
                <p>No Decks, please create one by clicking on the right</p>
              </ng-container>
              <app-dashboard-deck *ngFor="let deck of decks" [deck]="deck">
              </app-dashboard-deck>
            </mat-card>
          </app-spinner-container>
        </div>

        <div class="margin-top-bottom">
          <!-- list of cards "missed" last time -->
          <app-spinner-container [loading]="cardsLoading$">
            <mat-card *ngIf="(cards$ | async) as cards">
              <ng-container *ngIf="!cards.length">
                <p>
                  No Recent cards, please create one by clicking on the right
                </p>
              </ng-container>
              <app-dashboard-card
                *ngFor="let card of cards"
                [card]="card"
              ></app-dashboard-card>
            </mat-card>
          </app-spinner-container>
        </div>
      </section>

      <!-- second column-->
      <section fxFlex="50" class="margin">
        <mat-card> <app-dashboard-actions></app-dashboard-actions> </mat-card>
      </section>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  public decks$: Observable<Deck[]>;
  public userDecks$: Observable<Deck[]>;
  public cards$: Observable<Card[]>;
  public decksLoading$: Observable<boolean>;
  public cardsLoading$: Observable<boolean>;

  private user: User;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    // used resolve value from resolver
    this.user = this.route.snapshot.data.user;

    this.store.dispatch(new SearchRecentCards());
    this.cardsLoading$ = this.store.pipe(
      select(state => !state.cards.recentLoaded)
    );
    this.cards$ = this.store.pipe(select(getRecentCards));

    // find all decks for the current user
    this.store.dispatch(
      new SearchDecks(ref => ref.where('createdBy', '==', this.user.uid))
    );

    this.decksLoading$ = this.store.pipe(
      select(state => !state.decks.decksLoaded)
    );
    // any and all decks, will be "recent"
    this.decks$ = this.store.pipe(select(getDecks));

    this.userDecks$ = this.store.pipe(select(getUserDecks(this.user)));
  }
}
