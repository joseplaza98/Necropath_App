import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { U3Tema1Page } from './u3-tema-1.page';

const routes: Routes = [
  {
    path: '',
    component: U3Tema1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class U3Tema1PageRoutingModule {}
