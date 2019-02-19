import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardActionsComponent } from './dashboard-actions.component';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardActionsComponent],
  imports: [
    CommonModule,
    RouterModule,
    // angular material
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule
  ],
  exports: [DashboardActionsComponent]
})
export class DashboardActionsModule {}
