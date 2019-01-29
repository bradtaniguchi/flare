import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { DeckListFieldComponent } from './deck-list-field.component';

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
