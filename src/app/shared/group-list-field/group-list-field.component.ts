import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormControl, NgForm } from '@angular/forms';
import { Group } from 'src/app/models/group';
import { logger } from 'src/app/core/logger';

@Component({
  selector: 'app-group-list-field',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Group</mat-label>
      <mat-select
        [value]="group"
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

  compareWith(group1: Group | string, group2: Group | string): boolean {
    if (!group1 || !group2) {
      return false;
    }
    const getUid = (group: Group | string) =>
      typeof group === 'string' ? group : group.uid;
    const group1Uid = getUid(group1);
    const group2Uid = getUid(group2);
    return group1Uid === group2Uid;
  }
}
