import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDeckComponent } from './dashboard-deck.component';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatMenuModule
} from '@angular/material';
import { MatRippleModule } from '@angular/material/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DashboardDeckComponent],
  imports: [
    CommonModule,
    // angular material
    FlexLayoutModule,
    MatRippleModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule
  ],
  exports: [DashboardDeckComponent]
})
export class DashboardDeckModule {}
