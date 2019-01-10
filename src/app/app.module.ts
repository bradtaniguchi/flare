import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatSidenavModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store/app-store.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { Store } from '@ngrx/store';
import { initAppFactory } from './init';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // app modules
    AppStoreModule,
    CoreModule,
    // firebase
    AngularFireModule.initializeApp((window as any).__env),
    AngularFireAuthModule,
    AngularFirestoreModule,
    // angular material
    MatSidenavModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initAppFactory,
      deps: [AngularFireAuth, Store],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
