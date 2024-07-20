import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Test1PageRoutingModule } from './test-1-routing.module';
import { Test1Page } from './test-1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Test1PageRoutingModule
  ],
  declarations: [Test1Page]
})
export class Test1PageModule {}
