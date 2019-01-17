import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-dashboard-card',
  template: `
    {{ card | json }}
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardCardComponent implements OnInit {
  @Input() card: Card;
  constructor() {}

  ngOnInit() {}
}
