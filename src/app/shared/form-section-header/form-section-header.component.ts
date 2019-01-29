import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-form-section-header',
  template: `
    <div fxLayout="row" fxLayoutAlign="start center">
      <span class="mat-title no-margin" style="margin: 0">{{ header }}</span>
      <span *ngIf="!!description" class="margin-left-right"> - </span>
      <span class="mat-body-1" style="margin-left: 4px">
        {{ description }}
      </span>
    </div>
  `,
  styles: [
    `
      .margin-left-right {
        margin-left: 4px;
        margin-right: 4px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormSectionHeaderComponent implements OnInit {
  @Input() header: string;
  @Input() description: string;
  constructor() {}

  ngOnInit() {}
}
