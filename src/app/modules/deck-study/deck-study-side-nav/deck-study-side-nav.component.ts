import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-deck-study-side-nav',
  template: `
    <p>deck-study-side-nav works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeckStudySideNavComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
