import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardEditComponent } from './card-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CardEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardEditRoutingModule {}
