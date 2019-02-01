import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDeckComponent } from './dashboard-deck.component';
import {
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatListModule
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
    MatListModule
  ],
  exports: [DashboardDeckComponent]
})
export class DashboardDeckModule {}
