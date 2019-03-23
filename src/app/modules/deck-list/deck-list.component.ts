import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { logger } from 'src/app/core/logger';

@Component({
  selector: 'app-deck-list',
  template: `
    <p>deck-list works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckListComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    logger.log('deck-list called');
  }
}
