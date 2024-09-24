import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Test2PageRoutingModule } from './test-2-routing.module';

import { Test2Page } from './test-2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Test2PageRoutingModule
  ],
  declarations: [Test2Page]
})
export class Test2PageModule {}
