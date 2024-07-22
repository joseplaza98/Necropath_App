import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroU3PageRoutingModule } from './intro-u3-routing.module';

import { IntroU3Page } from './intro-u3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroU3PageRoutingModule
  ],
  declarations: [IntroU3Page]
})
export class IntroU3PageModule {}
