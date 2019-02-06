import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyCardComponent } from './study-card.component';

@NgModule({
  declarations: [StudyCardComponent],
  imports: [CommonModule],
  exports: [StudyCardComponent]
})
export class StudyCardModule {}
