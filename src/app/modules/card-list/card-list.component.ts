import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-list',
  template: `
    <p>card-list works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
