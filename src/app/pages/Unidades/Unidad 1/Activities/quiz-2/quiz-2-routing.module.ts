import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Quiz2Page } from './quiz-2.page';

const routes: Routes = [
  {
    path: '',
    component: Quiz2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Quiz2PageRoutingModule {}
