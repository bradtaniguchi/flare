import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MatButtonModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    // angular material
    MatButtonModule,
    MatListModule
  ],
  exports: [SideNavComponent]
})
export class SideNavModule {}
