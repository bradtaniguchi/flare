import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckListFieldComponent } from './deck-list-field.component';
import {
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DeckListFieldComponent],
  imports: [
    CommonModule,
    FormsModule,
    // angular material
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [DeckListFieldComponent]
})
export class DeckListFieldModule {}
