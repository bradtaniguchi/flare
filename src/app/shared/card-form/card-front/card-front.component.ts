import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card-front',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Card Front</mat-label>
      <input
        matInput
        name="front"
        type="text"
        id="front"
        required
        [ngModel]="card.front"
      />
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CardFrontComponent implements OnInit {
  @Input() card: Card;
  constructor() {}

  ngOnInit() {}
}
