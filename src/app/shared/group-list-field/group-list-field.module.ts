import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListFieldComponent } from './group-list-field.component';
import { FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [GroupListFieldComponent],
  imports: [
    CommonModule,
    FormsModule,
    // angular material
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [GroupListFieldComponent]
})
export class GroupListFieldModule {}
