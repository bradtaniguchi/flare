import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { LoginGuard } from './core/guards/login/login.guard';

const routes: Routes = [
  {
    path: 'login',
    canLoad: [LoginGuard],
    loadChildren: './modules/login/login.module#LoginModule',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [
      {
        path: 'cards',
        loadChildren: './modules/card-list/card-list.module#CardListModule',
        canLoad: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'cards/create',
        loadChildren:
          './modules/card-create/card-create.module#CardCreateModule',
        canLoad: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthGuard],
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'cards'
      }
    ]
  },
  {
    path: '**',
    // TODO: change to dashboard
    redirectTo: 'cards'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
