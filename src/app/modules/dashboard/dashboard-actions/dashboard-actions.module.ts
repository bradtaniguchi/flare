import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardActionsComponent } from './dashboard-actions.component';
import { MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DashboardActionsComponent],
  imports: [
    CommonModule,

    // angular material
    FlexLayoutModule,
    MatButtonModule
  ],
  exports: [DashboardActionsComponent]
})
export class DashboardActionsModule {}
