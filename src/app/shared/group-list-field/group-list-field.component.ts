import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm, FormControl } from '@angular/forms';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-group-list-field',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Group</mat-label>
      <mat-select
        [formControl]="control"
        [compareWith]="compareWith"
        matInput
        name="group"
        id="group"
        required
      >
        <mat-option></mat-option>
        <mat-option [value]="group" *ngFor="let group of groups">
          {{ group.name }}
        </mat-option>
      </mat-select>
      <mat-hint align="end">
        <mat-hint align="end">
          The group this card will go to</mat-hint
        ></mat-hint
      >
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class GroupListFieldComponent implements OnInit {
  @Input() group: Group;
  @Input() groups: Group[];
  @Input() control: FormControl;
  constructor() {}

  ngOnInit() {}
  displayFn(group: Group) {
    return group ? group.name : undefined;
  }

  compareWith(group1: Group, group2: Group) {
    return group1 && group2 && group1.uid === group2.uid;
  }
}
