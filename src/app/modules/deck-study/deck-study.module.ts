import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeckStudyRoutingModule } from './deck-study-routing.module';
import { DeckStudyComponent } from './deck-study.component';
import { SkipButtonComponent } from './skip-button/skip-button.component';
import {
  MatButtonModule,
  MatIconModule,
  MatRippleModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';
import { StudyCardModule } from './study-card/study-card.module';

@NgModule({
  declarations: [DeckStudyComponent, SkipButtonComponent],
  imports: [
    CommonModule,
    DeckStudyRoutingModule,
    SpinnerModule,
    StudyCardModule,
    // angular material
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule
  ]
})
export class DeckStudyModule {}
