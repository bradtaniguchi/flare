import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardCreateComponent } from './card-create.component';

const routes: Routes = [
  {
    path: '',
    component: CardCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardCreateRoutingModule {}
