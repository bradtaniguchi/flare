import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-skip-button',
  template: `
    <div matRipple class="skip-button">
      <button
        type="button"
        aria-label="skip"
        class="full-height"
        mat-stroked-button
        (click)="skip.emit()"
      >
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        height: calc(100vh - 112px);
      }
    `,
    `
      .skip-button {
        margin: 16px;
        height: 100%;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkipButtonComponent implements OnInit {
  @Output() skip = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
