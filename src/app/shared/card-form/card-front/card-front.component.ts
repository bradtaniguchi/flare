import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm, FormControl } from '@angular/forms';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card-front',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Card Front</mat-label>
      <input
        matInput
        [value]="card.front || ''"
        [formControl]="control"
        autocomplete="off"
        required
        type="text"
        id="front"
      />
      <mat-hint align="end"> This will be shown first when studying </mat-hint>
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CardFrontComponent implements OnInit {
  @Input() card: Card;
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {}
}
