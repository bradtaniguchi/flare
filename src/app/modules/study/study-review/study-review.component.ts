import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-state';
import { map, mergeMap, withLatestFrom, take } from 'rxjs/operators';
import { logger } from 'src/app/core/logger';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/core/services/session/session.service';
import { Notify } from 'src/app/app-store/notify/notify.actions';

@Component({
  selector: 'app-study-review',
  template: `
    <div class="view-container-padding">
      <mat-card>
        <mat-card-header>
          <mat-icon mat-card-avatar class="center-icon icon"> score </mat-icon>
          <mat-card-title>Study Result</mat-card-title>
          <mat-card-subtitle>
            Results for deck {{ deckName$ | async }}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>Total Cards: {{ total$ | async }}</p>
          <p>Skipped: {{ skipped$ | async }}</p>
          <p>Incorrect: {{ missed$ | async }}</p>
          <p>Correct: {{ correct$ | async }}</p>
          <!-- TODO: show previous averages -->
          <mat-divider></mat-divider>
        </mat-card-content>
        <mat-card-actions align="end">
          <button mat-button type="button" color="primary" (click)="ok()">
            Ok
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyReviewComponent implements OnInit {
  public deckName$: Observable<string>;

  public total$: Observable<number>;
  public skipped$: Observable<number>;
  public missed$: Observable<number>;
  public correct$: Observable<number>;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.saveSession();
    this.deckName$ = this.store.pipe(
      select(state => state.deckStudy.deck),
      map(deck => deck.name)
    );

    this.total$ = this.store.pipe(
      select(state => state.deckStudy.cards),
      map(cards => cards.length)
    );

    this.skipped$ = this.store.pipe(
      select(state => state.deckStudy.skipped),
      map(skipped => skipped.length)
    );

    this.missed$ = this.store.pipe(
      select(state => state.deckStudy.missed),
      map(skipped => skipped.length)
    );

    this.correct$ = this.store.pipe(
      select(state => state.deckStudy.correct),
      map(correct => correct.length)
    );
  }

  private saveSession() {
    logger.log('saving session...');
    this.store
      .pipe(
        select(state => state.deckStudy),
        withLatestFrom(this.store.select(state => state.auth.user)),
        mergeMap(([{ correct, deck, missed, skipped, startedOn }, user]) =>
          this.sessionService.create({
            correct,
            startedOn,
            deck,
            missed,
            skipped,
            user
          })
        ),
        take(1)
      )
      .subscribe(
        () =>
          this.store.dispatch(
            new Notify({
              message: 'Successfully saved session'
            })
          ),
        () =>
          this.store.dispatch(
            new Notify({
              message: 'Oops there was an issue saving the session'
            })
          )
      );
  }

  ok() {
    logger.log('ok clicked');
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
