import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardEditRoutingModule } from './card-edit-routing.module';
import { CardEditComponent } from './card-edit.component';

@NgModule({
  declarations: [CardEditComponent],
  imports: [CommonModule, CardEditRoutingModule]
})
export class CardEditModule {}
