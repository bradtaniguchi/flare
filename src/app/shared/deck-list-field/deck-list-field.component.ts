import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-deck-list-field',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Deck</mat-label>
      <mat-select [ngModel]="deck" matInput name="deck" [disabled]="disabled">
        <mat-option></mat-option>
        <mat-option [value]="deck" *ngFor="let deck of decks">
          {{ deck.name }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DeckListFieldComponent implements OnInit {
  @Input() deck: Deck;
  @Input() decks: Deck[];
  @Input() disabled: boolean;
  constructor() {}

  ngOnInit() {}

  displayFn(deck: Deck) {
    return deck ? deck.name : undefined;
  }

  compareWith(deck1: Deck, deck2: Deck) {
    return deck1.uid === deck2.uid;
  }
}
