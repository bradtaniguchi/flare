import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-edit',
  template: `
    <p>card-edit works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
