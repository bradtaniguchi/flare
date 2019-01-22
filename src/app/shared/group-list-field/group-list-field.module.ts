import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListFieldComponent } from './group-list-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [GroupListFieldComponent],
  imports: [
    CommonModule,
    // angular
    FormsModule,
    ReactiveFormsModule,
    // angular material
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [GroupListFieldComponent]
})
export class GroupListFieldModule {}
