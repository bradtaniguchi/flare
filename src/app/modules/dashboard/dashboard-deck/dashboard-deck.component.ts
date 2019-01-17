import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Deck } from 'src/app/models/deck';

@Component({
  selector: 'app-dashboard-deck',
  template: `
    <pre>{{ deck | json }}</pre>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardDeckComponent implements OnInit {
  @Input() deck: Deck;
  constructor() {}

  ngOnInit() {}
}
