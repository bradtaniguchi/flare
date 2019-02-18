import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStudyActionsComponent } from './dashboard-study-actions.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [DashboardStudyActionsComponent],
  imports: [CommonModule, FlexLayoutModule, MatCardModule],
  exports: [DashboardStudyActionsComponent]
})
export class DashboardStudyActionsModule {}
