import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyPreviewComponent } from './study-preview.component';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';
import {
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatRippleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormSectionHeaderModule } from 'src/app/shared/form-section-header/form-section-header.module';

@NgModule({
  declarations: [StudyPreviewComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    // angular material
    FlexLayoutModule,
    FormSectionHeaderModule,
    MatRippleModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  exports: [StudyPreviewComponent]
})
export class StudyPreviewModule {}
