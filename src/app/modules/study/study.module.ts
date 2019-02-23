import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudyRoutingModule } from './study-routing.module';
import { StudyComponent } from './study.component';
import { StudyCardModule } from './study-card/study-card.module';
import { StudyOverviewSideNavModule } from './study-overview-side-nav/study-overview-side-nav.module';
import { StudyPreviewModule } from './study-preview/study-preview.module';
import { StudyReviewModule } from './study-review/study-review.module';
import { StoreModule } from '@ngrx/store';
import { DeckStudyReducer } from 'src/app/app-store/deck-study/deck-study.reducer';
import { MatSidenavModule } from '@angular/material';
@NgModule({
  declarations: [StudyComponent],
  imports: [
    CommonModule,
    StudyRoutingModule,
    StoreModule.forFeature('deckStudy', DeckStudyReducer),
    // app modules
    StudyCardModule,
    StudyOverviewSideNavModule,
    StudyPreviewModule,
    StudyReviewModule,
    // angular
    MatSidenavModule
  ]
})
export class StudyModule {}
