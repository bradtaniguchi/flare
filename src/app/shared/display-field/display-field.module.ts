import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DisplayFieldComponent } from './display-field.component';
import { DisplayFieldLabelComponent } from './display-field-label/display-field-label.component';

@NgModule({
  declarations: [DisplayFieldComponent, DisplayFieldLabelComponent],
  imports: [
    // angular material
    FlexLayoutModule
  ],
  exports: [DisplayFieldComponent, DisplayFieldLabelComponent]
})
export class DisplayFieldModule {}
