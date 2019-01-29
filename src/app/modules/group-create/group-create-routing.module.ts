import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupCreateComponent } from './group-create.component';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: GroupCreateComponent,
    resolve: {
      user: UserResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupCreateRoutingModule {}
