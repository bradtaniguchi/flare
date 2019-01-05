import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'cards',
    loadChildren: './modules/card-list/card-list.module#CardListModule'
  },
  {
    path: 'cards/create',
    loadChildren: './modules/card-create/card-create.module#CardCreateModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
