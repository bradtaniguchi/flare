import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyCardComponent } from './study-card.component';
import { MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormSectionHeaderModule } from 'src/app/shared/form-section-header/form-section-header.module';

@NgModule({
  declarations: [StudyCardComponent],
  imports: [
    CommonModule,
    // angular material
    FormSectionHeaderModule,
    FlexLayoutModule,
    MatButtonModule
  ],
  exports: [StudyCardComponent]
})
export class StudyCardModule {}
