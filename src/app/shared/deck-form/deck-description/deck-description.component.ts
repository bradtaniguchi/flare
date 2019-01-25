import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, NgForm } from '@angular/forms';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-deck-description',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Deck Description</mat-label>
      <textarea
        matInput
        [value]="deck.description || ''"
        [formControl]="control"
        autocomplete="off"
        type="text"
        id="description"
      >
      </textarea>
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DeckDescriptionComponent implements OnInit {
  @Input() deck: Deck;
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {}
}
