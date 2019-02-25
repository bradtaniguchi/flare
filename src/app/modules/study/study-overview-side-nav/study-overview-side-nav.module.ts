import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyOverviewSideNavComponent } from './study-overview-side-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatListModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { SlimCardModule } from 'src/app/shared/slim-card/slim-card.module';

@NgModule({
  declarations: [StudyOverviewSideNavComponent],
  imports: [
    CommonModule,
    SlimCardModule,
    // angular material
    FlexLayoutModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [StudyOverviewSideNavComponent]
})
export class StudyOverviewSideNavModule {}
