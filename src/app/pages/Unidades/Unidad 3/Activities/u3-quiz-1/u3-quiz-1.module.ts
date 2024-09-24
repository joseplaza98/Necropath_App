import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { U3Quiz1PageRoutingModule } from './u3-quiz-1-routing.module';

import { U3Quiz1Page } from './u3-quiz-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    U3Quiz1PageRoutingModule
  ],
  declarations: [U3Quiz1Page]
})
export class U3Quiz1PageModule {}
