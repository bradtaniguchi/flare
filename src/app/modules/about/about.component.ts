import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
    <div class="full-height view-container-padding">
      <mat-card>
        <mat-card-content>
          <p>
            Application is hosted on
            <a href="https://github.com/bradtaniguchi">github</a>
          </p>
          <p>
            Created by and maintained by
            <a href="https://github.com/bradtaniguchi">Brad Taniguchi</a>
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      a {
        color: #0b00c0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
