import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, share, startWith, tap } from 'rxjs/operators';
import { logger } from 'src/app/core/logger';
import { DeckService } from 'src/app/core/services/deck/deck.service';
import { GroupService } from 'src/app/core/services/group/group.service';
import { Deck } from 'src/app/models/deck';
import { Group } from 'src/app/models/group';
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
          <app-form-section-header
            header="Decks created by you"
            description="Below are decks you have personally created"
          >
          </app-form-section-header>
          <!-- list of all decks -->
          <app-spinner-container [loading]="decksLoading$">
            <ng-container *ngIf="(decks$ | async) as decks">
              <ng-container *ngIf="!decks.length">
                <p>No Decks, please create one by clicking on the right</p>
              </ng-container>
              <app-dashboard-deck
                *ngFor="let deck of decks"
                [deck]="deck"
                (edit)="editDeck($event)"
                (study)="studyDeck($event)"
                (remove)="removeDeck($event)"
              >
              </app-dashboard-deck>
            </ng-container>
          </app-spinner-container>
        </div>
        <div>
          <app-form-section-header
            header="Groups"
            description="Groups you are part of"
          >
          </app-form-section-header>
          <app-spinner-container [loading]="groupsLoading$">
            <ng-container *ngIf="(groups$ | async) as groups">
              <ng-container *ngIf="!groups.length">
                <p>There was an error getting groups</p>
              </ng-container>
              <app-dashboard-group *ngFor="let group of groups" [group]="group">
              </app-dashboard-group>
            </ng-container>
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
  public decksLoading$: Observable<boolean>;
  public groups$: Observable<Group[]>;
  public groupsLoading$: Observable<boolean>;

  private user: User;
  constructor(
    // private store: Store<AppState>,
    private deckService: DeckService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // used resolve value from resolver
    this.user = this.route.snapshot.data.user;
    this.decks$ = this.observeDecks();
    this.decksLoading$ = this.decks$.pipe(
      map(decks => !decks),
      startWith(true)
    );

    this.groups$ = this.observeGroups();
    this.groupsLoading$ = this.groups$.pipe(
      map(groups => !groups),
      startWith(true)
    );
  }

  private observeDecks(): Observable<Deck[]> {
    return this.deckService
      .list({
        user: this.user,
        queryFn: ref => ref.where('createdBy', '==', this.user.uid)
      })
      .pipe(
        share(),
        tap(decks => logger.log('test with decks: ', decks))
      );
  }
  private observeGroups(): Observable<Group[]> {
    return this.groupService.listUserGroups({ user: this.user }).pipe(share());
  }

  studyDeck(deck: Deck) {
    logger.log('study deck called: ', deck);
    this.router.navigate(['/', 'decks', 'study', deck.uid]);
  }

  editDeck(deck: Deck) {
    logger.log('edit deck called: ', deck);
    this.router.navigate(['/', 'decks', 'edit', deck.uid]);
  }
  removeDeck(deck: Deck) {
    logger.log('remove deck called:', deck);
  }
}
