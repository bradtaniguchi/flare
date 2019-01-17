import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner.component';
import { SpinnerContainerComponent } from './spinner-container/spinner-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  declarations: [SpinnerComponent, SpinnerContainerComponent],
  imports: [
    CommonModule,
    // angular material
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  exports: [SpinnerComponent, SpinnerContainerComponent]
})
export class SpinnerModule {}
