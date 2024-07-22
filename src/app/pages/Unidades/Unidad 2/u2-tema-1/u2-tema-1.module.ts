import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { U2Tema1PageRoutingModule } from './u2-tema-1-routing.module';

import { U2Tema1Page } from './u2-tema-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    U2Tema1PageRoutingModule
  ],
  declarations: [U2Tema1Page]
})
export class U2Tema1PageModule {}
