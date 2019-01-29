import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSectionHeaderComponent } from './form-section-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FormSectionHeaderComponent],
  imports: [
    CommonModule,
    // angular material
    FlexLayoutModule
  ],
  exports: [FormSectionHeaderComponent]
})
export class FormSectionHeaderModule {}
