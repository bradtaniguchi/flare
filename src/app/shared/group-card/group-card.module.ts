import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupCardComponent } from './group-card.component';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';

@NgModule({
  declarations: [GroupCardComponent],
  imports: [
    CommonModule,
    // angular material
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [GroupCardComponent]
})
export class GroupCardModule {}
