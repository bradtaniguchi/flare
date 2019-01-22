import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckListFieldComponent } from './deck-list-field.component';
import {
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DeckListFieldComponent],
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
  exports: [DeckListFieldComponent]
})
export class DeckListFieldModule {}
