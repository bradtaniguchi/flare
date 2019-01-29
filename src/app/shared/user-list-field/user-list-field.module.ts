import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListFieldComponent } from './user-list-field.component';
import {
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserListFieldComponent],
  imports: [
    CommonModule,
    // angular
    FormsModule,
    ReactiveFormsModule,
    // angular material
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  exports: [UserListFieldComponent]
})
export class UserListFieldModule {}
