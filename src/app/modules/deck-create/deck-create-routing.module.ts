import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckCreateComponent } from './deck-create.component';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: DeckCreateComponent,
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
export class DeckCreateRoutingModule {}
