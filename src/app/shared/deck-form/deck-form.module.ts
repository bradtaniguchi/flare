import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckNameComponent } from './deck-name/deck-name.component';
import { DeckDescriptionComponent } from './deck-description/deck-description.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [DeckNameComponent, DeckDescriptionComponent],
  exports: [DeckNameComponent, DeckDescriptionComponent],
  imports: [
    CommonModule,
    // angular
    FormsModule,
    ReactiveFormsModule,
    // angular material
    MatInputModule,
    MatFormFieldModule
  ]
})
export class DeckFormModule {}
