import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppState } from './app-state';
import { LoadingReducer } from './loading/loading.reducer';
import { SyncReducer } from './sync/sync.reducer';
import { AuthReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { CardEffects } from './card/card.effects';

@NgModule({
  declarations: [],
  imports: [
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AuthEffects, CardEffects]),
    StoreModule.forRoot<AppState>({
      auth: AuthReducer,
      loading: LoadingReducer,
      sync: SyncReducer
    })
  ]
})
export class AppStoreModule {}
