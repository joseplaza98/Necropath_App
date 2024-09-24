import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Quiz2PageRoutingModule } from './quiz-2-routing.module';

import { Quiz2Page } from './quiz-2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Quiz2PageRoutingModule
  ],
  declarations: [Quiz2Page]
})
export class Quiz2PageModule {}
