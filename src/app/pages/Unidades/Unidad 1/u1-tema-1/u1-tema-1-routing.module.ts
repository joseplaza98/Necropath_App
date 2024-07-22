import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { U1Tema1Page } from './u1-tema-1.page';

const routes: Routes = [
  {
    path: '',
    component: U1Tema1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class U1Tema1PageRoutingModule {}
