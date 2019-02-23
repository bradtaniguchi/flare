import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyOverviewSideNavComponent } from './study-overview-side-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatListModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [StudyOverviewSideNavComponent],
  imports: [
    CommonModule,
    // angular material
    FlexLayoutModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [StudyOverviewSideNavComponent]
})
export class StudyOverviewSideNavModule {}
