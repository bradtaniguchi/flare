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

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    // nested "component" modules
    DashboardDeckModule,
    DashboardCardModule,
    DashboardActionsModule,
    DashboardGroupModule,
    // app modules
    SpinnerModule,
    FormSectionHeaderModule,
    // angular material
    FlexLayoutModule,
    MatCardModule
  ]
})
export class DashboardModule {}
