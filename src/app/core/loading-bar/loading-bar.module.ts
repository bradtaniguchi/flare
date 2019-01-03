import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBarComponent } from './loading-bar.component';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  declarations: [LoadingBarComponent],
  imports: [
    CommonModule,
    // angular material
    MatProgressBarModule
  ],
  exports: [LoadingBarComponent]
})
export class LoadingBarModule {}
