import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { U2Tema1Page } from './u2-tema-1.page';

const routes: Routes = [
  {
    path: '',
    component: U2Tema1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class U2Tema1PageRoutingModule {}
