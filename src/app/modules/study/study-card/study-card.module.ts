import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyCardComponent } from './study-card.component';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormSectionHeaderModule } from 'src/app/shared/form-section-header/form-section-header.module';
import { SlimCardModule } from 'src/app/shared/slim-card/slim-card.module';

@NgModule({
  declarations: [StudyCardComponent],
  imports: [
    CommonModule,
    SlimCardModule,
    // angular material
    FormSectionHeaderModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [StudyCardComponent]
})
export class StudyCardModule {}
