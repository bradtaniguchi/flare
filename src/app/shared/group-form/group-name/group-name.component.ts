import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ControlContainer, NgForm } from '@angular/forms';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-group-name',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Group Name</mat-label>
      <input
        matInput
        [value]="group.name || ''"
        [formControl]="control"
        autocomplete="off"
        required
        type="text"
        id="name"
      />
      <mat-hint align="end">This will be the name of the group</mat-hint>
    </mat-form-field>
  `,
  styles: [],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class GroupNameComponent implements OnInit {
  @Input() group: Group;
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {}
}
