import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDeckComponent } from './dashboard-deck.component';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [DashboardDeckComponent],
  imports: [
    CommonModule,
    // angular material
    MatCardModule,
    MatButtonModule
  ],
  exports: [DashboardDeckComponent]
})
export class DashboardDeckModule {}
