import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { U3Quiz1Page } from './u3-quiz-1.page';

const routes: Routes = [
  {
    path: '',
    component: U3Quiz1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class U3Quiz1PageRoutingModule {}
