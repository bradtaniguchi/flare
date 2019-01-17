import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner-container',
  template: `
    <ng-container *ngIf="(loading | async); else showContent">
      <app-spinner></app-spinner>
    </ng-container>
    <ng-template #showContent> <ng-content></ng-content> </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerContainerComponent implements OnInit {
  @Input() loading: Observable<boolean>;
  constructor() {}

  ngOnInit() {}
}
