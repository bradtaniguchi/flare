import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `
    <p>settings works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
