import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyReviewComponent } from './study-review.component';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatListModule
} from '@angular/material';
import { FormSectionHeaderModule } from 'src/app/shared/form-section-header/form-section-header.module';

@NgModule({
  declarations: [StudyReviewComponent],
  imports: [
    CommonModule,
    // angular material
    FormSectionHeaderModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [StudyReviewComponent]
})
export class StudyReviewModule {}
