import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app-store/app-state';
import { CreateCard } from 'src/app/app-store/card/card.actions';
import { CreateCardForm } from './create-card-form';

@Component({
  selector: 'app-card-create',
  template: `
    <div>
      <form #form="ngForm" (submit)="submit($event, form)">
        <section fxLayout="column">
          <app-card-front [card]="card"></app-card-front>
          <app-card-back [card]="card"></app-card-back>
          <app-group-list-field [groups]="groups"></app-group-list-field>
          <app-deck-list-field
            [decks]="decks"
            *ngIf="groupHasValue(form)"
          ></app-deck-list-field>
        </section>
        <section fxLayout="row" fxLayoutAlign="end">
          <button type="button" mat-button (click)="back()">Back</button>
          <button type="submit" mat-button color="primary">Submit</button>
        </section>
      </form>
    </div>
    <pre>
      card: {{ card | json }}
    </pre
    >
    <pre>
      form: {{ form.value | json }}
    </pre
    >
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCreateComponent implements OnInit {
  public card = {};
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
  public groups = [
    {
      uid: 2,
      name: 'group 1'
    },
    {
      uid: 3,
      name: 'group 2'
    }
  ];
  constructor(private location: Location, private store: Store<AppState>) {}

  ngOnInit() {}

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
      // TODO: redirect
    }
  }
}
