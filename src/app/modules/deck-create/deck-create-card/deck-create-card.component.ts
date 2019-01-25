import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-deck-create-card',
  template: `
    <div fxLayout="row" fxLayoutGap="8px">
      <div fxFlex="49">
        <app-card-front [card]="card" [control]="formGroup.get('front')">
        </app-card-front>
      </div>
      <div fxFlex="49">
        <app-card-back [card]="card" [control]="formGroup.get('back')">
        </app-card-back>
      </div>
      <div fxFlex fxLayoutAlign="center center" fxLayout="column">
        <button
          type="button"
          mat-icon-button
          (click)="remove.emit(formGroup)"
          style="margin-bottom:20px "
        >
          <mat-icon>close</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: []
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckCreateCardComponent implements OnInit {
  @Input() card = {};
  @Input() formGroup: FormGroup;
  @Output() remove = new EventEmitter<FormGroup>();
  constructor() {}

  ngOnInit() {}
}
