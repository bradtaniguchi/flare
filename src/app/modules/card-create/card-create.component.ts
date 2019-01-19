import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app-store/app-state';
import { CreateCard } from 'src/app/app-store/card/card.actions';
import { Card } from 'src/app/models/card';
import { Group } from 'src/app/models/group';
import { CreateCardForm } from './create-card-form';
import { SearchGroups } from 'src/app/app-store/group/group.actions';

@Component({
  selector: 'app-card-create',
  template: `
    <div class="view-container-padding">
      <form #form="ngForm" (submit)="submit($event, form)">
        <section fxLayout="column">
          <app-card-front [card]="card"></app-card-front>
          <app-card-back [card]="card"></app-card-back>
          <app-group-list-field
            [groups]="groups$ | async"
          ></app-group-list-field>
          <app-deck-list-field
            [decks]="decks"
            [disabled]="!groupHasValue(form)"
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
export class CardCreateComponent implements OnInit {
  public card: Partial<Card> = {};
  public decks = [
    {
      uid: '1',
      name: 'deck1'
    },
    {
      uid: '2',
      name: 'deck2'
    }
  ];
  public groups$: Observable<Group[]>;
  public loading$: Observable<boolean>;
  constructor(private location: Location, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new SearchGroups());
    this.groups$ = this.store.pipe(select(state => state.groups.groups));
  }

  groupHasValue(form: NgForm): boolean {
    return !!(
      form &&
      form.controls &&
      form.controls.group &&
      form.controls.group.value
    );
  }

  back() {
    this.location.back();
  }

  submit(event: Event, form: NgForm) {
    if (form.valid) {
      console.log('event:', event, 'form:', form);
      this.store.dispatch(new CreateCard(form.value as CreateCardForm));
    }
  }
}
