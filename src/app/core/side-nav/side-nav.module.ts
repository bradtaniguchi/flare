import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav.component';

@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    // angular
    RouterModule,
    // angular material
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  exports: [SideNavComponent]
})
export class SideNavModule {}
