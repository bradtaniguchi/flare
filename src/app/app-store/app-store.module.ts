import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppState } from './app-state';
import { AuthEffects } from './auth/auth.effects';
import { AuthReducer } from './auth/auth.reducer';
import { LoadingReducer } from './loading/loading.reducer';
import { NotifyEffects } from './notify/notify.effects';
import { SyncReducer } from './sync/sync.reducer';
import { UserEffects } from './user/user.effects';
import { UserReducer } from './user/user.reducer';

@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forRoot([AuthEffects, NotifyEffects, UserEffects]),
    StoreModule.forRoot<AppState>({
      auth: AuthReducer,
      loading: LoadingReducer,
      sync: SyncReducer,
      users: UserReducer
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ]
})
export class AppStoreModule {}
