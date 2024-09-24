import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { U2Quiz1PageRoutingModule } from './u2-quiz-1-routing.module';

import { U2Quiz1Page } from './u2-quiz-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    U2Quiz1PageRoutingModule
  ],
  declarations: [U2Quiz1Page]
})
export class U2Quiz1PageModule {}
