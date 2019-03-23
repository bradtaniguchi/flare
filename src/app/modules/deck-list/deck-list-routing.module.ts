import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckListComponent } from './deck-list.component';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: DeckListComponent,
    pathMatch: 'full'
    // resolve: {
    //   user: UserResolver
    // }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckListRoutingModule {}
