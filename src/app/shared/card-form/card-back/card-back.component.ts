import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, NgForm } from '@angular/forms';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card-back',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Card Back</mat-label>
      <input
        [value]="card.back || ''"
        [formControl]="control"
        required
        matInput
        autocomplete="off"
        name="back"
        type="text"
        id="back"
      />
      <mat-hint align="end">
        This will be shown after "flipping" the card when studying
      </mat-hint>
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CardBackComponent implements OnInit {
  @Input() card: Card;
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {}
}
