import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './side-nav.component';
import { IsActivePipe } from './is-active.pipe';

@NgModule({
  declarations: [SideNavComponent, IsActivePipe],
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
