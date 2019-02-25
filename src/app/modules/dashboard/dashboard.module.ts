import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardDeckModule } from './dashboard-deck/dashboard-deck.module';
import { DashboardCardModule } from './dashboard-card/dashboard-card.module';
import { DashboardActionsModule } from './dashboard-actions/dashboard-actions.module';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';
import { DashboardGroupModule } from './dashboard-group/dashboard-group.module';
import { FormSectionHeaderModule } from 'src/app/shared/form-section-header/form-section-header.module';
import { DashboardStudyActionsModule } from './dashboard-study-actions/dashboard-study-actions.module';
import { SlimCardModule } from 'src/app/shared/slim-card/slim-card.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    // nested "component" modules
    SlimCardModule,
    DashboardDeckModule,
    DashboardCardModule,
    DashboardActionsModule,
    DashboardGroupModule,
    DashboardStudyActionsModule,
    // app modules
    SpinnerModule,
    FormSectionHeaderModule,
    // angular material
    FlexLayoutModule,
    MatCardModule
  ]
})
export class DashboardModule {}
