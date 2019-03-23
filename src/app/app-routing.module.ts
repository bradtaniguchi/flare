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
    path: 'status',
    loadChildren: './modules/status/status.module#StatusModule',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadChildren: './modules/about/about.module#AboutModule',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cards/create',
        loadChildren:
          './modules/card-create/card-create.module#CardCreateModule',
        pathMatch: 'full'
      },
      {
        path: 'cards',
        loadChildren: './modules/card-list/card-list.module#CardListModule',
        pathMatch: 'full'
      },
      {
        path: 'decks/create',
        loadChildren:
          './modules/deck-create/deck-create.module#DeckCreateModule',
        pathMatch: 'full'
      },
      {
        // TODO: remove later
        path: 'decks/study',
        redirectTo: 'study'
      },
      {
        path: 'study',
        loadChildren: './modules/study/study.module#StudyModule'
      },
      {
        path: 'decks/edit',
        loadChildren: './modules/deck-edit/deck-edit.module#DeckEditModule'
      },
      {
        path: 'groups',
        loadChildren: './modules/group-list/group-list.module#GroupListModule'
      },
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        pathMatch: 'full'
      },
      {
        path: 'settings',
        loadChildren: './modules/settings/settings.module#SettingsModule',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
