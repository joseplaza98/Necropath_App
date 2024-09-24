import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { U2Quiz1Page } from './u2-quiz-1.page';

const routes: Routes = [
  {
    path: '',
    component: U2Quiz1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class U2Quiz1PageRoutingModule {}
