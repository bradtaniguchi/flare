import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';
import { StudyCardComponent } from './study-card/study-card.component';
import { StudyPreviewComponent } from './study-preview/study-preview.component';
import { StudyReviewComponent } from './study-review/study-review.component';
import { StudyComponent } from './study.component';
import { HasStudySessionGuard } from './has-study-session.guard';

const routes: Routes = [
  {
    path: ':deckId',
    component: StudyComponent,
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: '',
        component: StudyPreviewComponent,
        pathMatch: 'full'
      },
      {
        path: 'card/:cardId',
        component: StudyCardComponent,
        pathMatch: 'full',
        canActivate: [HasStudySessionGuard]
      },
      {
        path: 'review',
        component: StudyReviewComponent,
        pathMatch: 'full',
        canActivate: [HasStudySessionGuard]
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyRoutingModule {}
