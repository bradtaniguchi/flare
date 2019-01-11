import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div>
      <p>LISTS OF DECKS HERE</p>

      <p>STUDY CARDS HERE</p>

      <p>CREATION BUTTONS HERE</p>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
