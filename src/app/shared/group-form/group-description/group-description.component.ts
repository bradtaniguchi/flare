import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-group-description',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Group Description</mat-label>
      <textarea
        matInput
        [value]="group.description || ''"
        [formControl]="control"
        autocomplete="off"
        type="text"
        id="description"
      >
      </textarea>
    </mat-form-field>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDescriptionComponent implements OnInit {
  @Input() group: Group;
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {}
}
