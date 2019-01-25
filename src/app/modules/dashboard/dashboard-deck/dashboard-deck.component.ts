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
    <p>name: {{ deck.name }}</p>
    <p>description: {{ deck.name }}</p>
    <p># of cards: {{ tempCardCount() }}</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardDeckComponent implements OnInit {
  @Input() deck: Deck;
  constructor() {}

  ngOnInit() {}

  tempCardCount(): number {
    return Object.keys(this.deck.cards || {}).length;
  }
}
