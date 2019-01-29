import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListFieldComponent } from './role-list-field.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  declarations: [RoleListFieldComponent],
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
  exports: [RoleListFieldComponent]
})
export class RoleListFieldModule {}
