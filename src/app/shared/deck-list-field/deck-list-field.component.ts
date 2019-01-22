import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm, FormControl } from '@angular/forms';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-deck-list-field',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Deck</mat-label>
      <mat-select
        [formControl]="control"
        required
        matInput
        name="deck"
        [compareWith]="compareWith"
      >
        <mat-option></mat-option>
        <mat-option [value]="deck" *ngFor="let deck of decks">
          {{ deck.name }}
        </mat-option>
      </mat-select>
      <mat-hint align="end"> The deck this card will go to </mat-hint>
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DeckListFieldComponent implements OnInit {
  @Input() deck: Deck;
  @Input() decks: Deck[];
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {}

  displayFn(deck: Deck) {
    return deck ? deck.name : undefined;
  }

  compareWith(deck1: Deck, deck2: Deck) {
    return deck1.uid === deck2.uid;
  }
}
