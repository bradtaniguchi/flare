import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCardComponent } from './dashboard-card.component';

@NgModule({
  declarations: [DashboardCardComponent],
  imports: [CommonModule],
  exports: [DashboardCardComponent]
})
export class DashboardCardModule {}
