import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { LoadingBarModule } from './loading-bar/loading-bar.module';
import { SideNavModule } from './side-nav/side-nav.module';
import { FooterModule } from './footer/footer.module';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarConfig
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // modules
    HeaderModule,
    LoadingBarModule,
    SideNavModule,
    FooterModule,

    // global angular modules
    MatSnackBarModule
  ],
  exports: [HeaderModule, LoadingBarModule, SideNavModule, FooterModule],
  providers: [
    // global "overrides"
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 200
      } as MatSnackBarConfig
    }
  ]
})
export class CoreModule {}
