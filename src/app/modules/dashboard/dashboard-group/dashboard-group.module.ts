import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardGroupComponent } from './dashboard-group.component';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [DashboardGroupComponent],
  imports: [
    CommonModule,
    // angular material
    MatCardModule,
    MatButtonModule
  ],
  exports: [DashboardGroupComponent]
})
export class DashboardGroupModule {}
