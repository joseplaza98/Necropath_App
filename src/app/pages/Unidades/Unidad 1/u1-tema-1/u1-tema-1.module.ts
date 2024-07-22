import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { U1Tema1PageRoutingModule } from './u1-tema-1-routing.module';

import { U1Tema1Page } from './u1-tema-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    U1Tema1PageRoutingModule
  ],
  declarations: [U1Tema1Page]
})
export class U1Tema1PageModule {}
