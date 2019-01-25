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
import { CardReducer } from './card/card.reducer';
import { DeckReducer } from './deck/deck.reducer';
import { GroupReducer } from './group/group.reducer';
import { DeckEffects } from './deck/deck.effects';
import { GroupEffects } from './group/group.effects';
import { NotifyEffects } from './notify/notify.effects';

@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forRoot([
      AuthEffects,
      CardEffects,
      DeckEffects,
      GroupEffects,
      NotifyEffects
    ]),
    StoreModule.forRoot<AppState>({
      auth: AuthReducer,
      loading: LoadingReducer,
      sync: SyncReducer,
      cards: CardReducer,
      decks: DeckReducer,
      groups: GroupReducer
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ]
})
export class AppStoreModule {}
