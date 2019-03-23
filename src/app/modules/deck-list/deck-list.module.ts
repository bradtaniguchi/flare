import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckListRoutingModule } from './deck-list-routing.module';
import { DeckListComponent } from './deck-list.component';

@NgModule({
  declarations: [DeckListComponent],
  imports: [CommonModule, DeckListRoutingModule]
})
export class DeckListModule {}
