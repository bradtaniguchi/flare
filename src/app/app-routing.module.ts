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
        path: 'decks/study',
        // loadChildren: './modules/deck-study/deck-study.module#DeckStudyModule'
        redirectTo: 'study'
        // pathMatch: 'full'
      },
      {
        path: 'study',
        loadChildren: './modules/study/study.module#StudyModule'
      },
      {
        path: 'groups/create',
        loadChildren:
          './modules/group-create/group-create.module#GroupCreateModule',
        pathMatch: 'full'
      },
      {
        path: 'groups',
        loadChildren: './modules/group-list/group-list.module#GroupListModule',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
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
