import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntroU3Page } from './intro-u3.page';

const routes: Routes = [
  {
    path: '',
    component: IntroU3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroU3PageRoutingModule {}
