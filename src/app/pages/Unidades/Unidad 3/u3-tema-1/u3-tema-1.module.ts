import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { U3Tema1PageRoutingModule } from './u3-tema-1-routing.module';

import { U3Tema1Page } from './u3-tema-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    U3Tema1PageRoutingModule
  ],
  declarations: [U3Tema1Page]
})
export class U3Tema1PageModule {}
