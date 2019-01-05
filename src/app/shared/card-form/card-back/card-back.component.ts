import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Card } from 'src/app/models/card';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-card-back',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Card Back</mat-label>
      <input
        matInput
        name="back"
        type="text"
        id="back"
        required
        [ngModel]="card.back"
      />
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class CardBackComponent implements OnInit {
  @Input() card: Card;
  constructor() {}

  ngOnInit() {}
}
