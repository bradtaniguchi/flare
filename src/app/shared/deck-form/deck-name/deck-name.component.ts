import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Deck } from 'src/app/models/deck';
import { FormControl, ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-deck-name',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Deck Name</mat-label>
      <input
        matInput
        [value]="deck.name || ''"
        [formControl]="control"
        autocomplete="off"
        required
        type="text"
        id="name"
      />
      <mat-hint align="end"> This will be the name of the deck</mat-hint>
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class DeckNameComponent implements OnInit {
  @Input() deck: Deck;
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {}
}
