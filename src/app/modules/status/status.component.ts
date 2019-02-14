import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CONFIG } from 'src/app/config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-status',
  template: `
    <div class="view-container-padding">
      <pre class="code">{{ status | json }}</pre>
    </div>
  `,
  styles: [
    `
      .code {
        page-break-inside: avoid;
        font-family: monospace;
        font-size: 15px;
        line-height: 1.6;
        margin-bottom: 1.6em;
        max-width: 100%;
        overflow: auto;
        padding: 1em 1.5em;
        display: block;
        word-wrap: break-word;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent implements OnInit {
  public status: any;
  constructor() {}

  ngOnInit() {
    this.status = {
      buildDate: CONFIG.date,
      buildHash: CONFIG.revision,
      env: environment.env,
      production: environment.production,
      log: environment.log
    };
  }
}
