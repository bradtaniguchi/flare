import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeckStudyComponent } from './deck-study.component';
import { StudyCardComponent } from './study-card/study-card.component';

const routes: Routes = [
  {
    path: ':deckId',
    component: DeckStudyComponent,
    pathMatch: 'full',
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
