import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckEditComponent } from './deck-edit.component';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: ':deckId',
    component: DeckEditComponent,
    resolve: {
      // this is so we can set the "default" group and deck initially
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckEditRoutingModule {}
