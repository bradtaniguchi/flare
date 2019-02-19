import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStudyActionsComponent } from './dashboard-study-actions.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [DashboardStudyActionsComponent],
  imports: [
    CommonModule,
    // angular material
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule
  ],
  exports: [DashboardStudyActionsComponent]
})
export class DashboardStudyActionsModule {}
