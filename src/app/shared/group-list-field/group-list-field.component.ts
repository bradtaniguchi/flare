import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-group-list-field',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>Group</mat-label>
      <mat-select [ngModel]="group" matInput name="group" id="group">
        <mat-option></mat-option>
        <mat-option [value]="group" *ngFor="let group of groups">
          {{ group.name }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [],
  // changeDetection: ChangeDetectionStrategy.OnPush
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class GroupListFieldComponent implements OnInit {
  @Input() group: Group;
  @Input() groups: Group[];
  constructor() {}

  ngOnInit() {}
  displayFn(group: Group) {
    return group ? group.name : undefined;
  }

  compareWith(group1: Group, group2: Group) {
    return group1.uid > group2.uid;
  }
}
