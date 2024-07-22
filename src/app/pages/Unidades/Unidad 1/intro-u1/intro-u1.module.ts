import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroU1PageRoutingModule } from './intro-u1-routing.module';

import { IntroU1Page } from './intro-u1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroU1PageRoutingModule
  ],
  declarations: [IntroU1Page]
})
export class IntroU1PageModule {}
