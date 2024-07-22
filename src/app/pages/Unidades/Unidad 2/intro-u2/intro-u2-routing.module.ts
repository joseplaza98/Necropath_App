import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroU2Page } from './intro-u2.page';

const routes: Routes = [
  {
    path: '',
    component: IntroU2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroU2PageRoutingModule {}
