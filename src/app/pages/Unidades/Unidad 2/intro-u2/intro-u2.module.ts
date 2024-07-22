import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroU2PageRoutingModule } from './intro-u2-routing.module';

import { IntroU2Page } from './intro-u2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroU2PageRoutingModule
  ],
  declarations: [IntroU2Page]
})
export class IntroU2PageModule {}
