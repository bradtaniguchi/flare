import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDeckComponent } from './dashboard-deck.component';

@NgModule({
  declarations: [DashboardDeckComponent],
  imports: [CommonModule],
  exports: [DashboardDeckComponent]
})
export class DashboardDeckModule {}
