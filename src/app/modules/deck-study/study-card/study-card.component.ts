import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-study-card',
  template: `
    <p>study-card works!</p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
