import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroU1Page } from './intro-u1.page';

const routes: Routes = [
  {
    path: '',
    component: IntroU1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroU1PageRoutingModule {}
