import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckStudyComponent } from './deck-study.component';
import { StudyCardComponent } from './study-card/study-card.component';
import { UserResolver } from 'src/app/core/resolvers/user.resolver';

const routes: Routes = [
  {
    path: ':deckId',
    component: DeckStudyComponent,
    pathMatch: 'full',
    resolve: {
      user: UserResolver
    },
    children: [
      {
        path: 'card/:cardId',
        component: StudyCardComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeckStudyRoutingModule {}
