import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list.component';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
    resolve: {
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupListRoutingModule {}
