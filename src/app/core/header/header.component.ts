import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar matPrimary="primary">
      <mat-toolbar-row>
        <button
          mat-icon-button
          type="button"
          aria-label="Toggle Menu"
          (click)="toggleNav.next()"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <a [routerLink]="['/']">Angular Flash Cards</a>
      </mat-toolbar-row>
    </mat-toolbar>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Output() toggleNav = new EventEmitter();
  constructor() {}

  ngOnInit() {}
}
