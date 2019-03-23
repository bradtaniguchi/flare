import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list.component';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: 'create',
    loadChildren: '../group-create/group-create.module#GroupCreateModule',
    pathMatch: 'full'
  },
  {
    path: ':groupId/decks',
    loadChildren: '../deck-list/deck-list.module#DeckListModule',
    pathMatch: 'full'
  },
  {
    path: '',
    component: GroupListComponent,
    resolve: {
      user: UserResolver
    },
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupListRoutingModule {}
