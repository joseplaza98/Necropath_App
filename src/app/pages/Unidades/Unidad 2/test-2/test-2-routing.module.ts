import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Test2Page } from './test-2.page';

const routes: Routes = [
  {
    path: '',
    component: Test2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Test2PageRoutingModule {}
