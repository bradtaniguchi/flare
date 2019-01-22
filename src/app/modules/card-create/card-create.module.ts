import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { CardCreateRoutingModule } from './card-create-routing.module';
import { CardCreateComponent } from './card-create.component';
import { CardFormModule } from 'src/app/shared/card-form/card-form.module';
import { DeckListFieldModule } from 'src/app/shared/deck-list-field/deck-list-field.module';
import { GroupListFieldModule } from 'src/app/shared/group-list-field/group-list-field.module';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';

@NgModule({
  declarations: [CardCreateComponent],
  imports: [
    CommonModule,
    CardCreateRoutingModule,
    CardFormModule,
    DeckListFieldModule,
    GroupListFieldModule,
    SpinnerModule,
    // angular
    FormsModule,
    ReactiveFormsModule,
    // angular material
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class CardCreateModule {}
