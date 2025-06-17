// src/app/pages/habitos/habitos.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HabitosPageRoutingModule } from './habitos-routing.module';
import { HabitosPage } from './habitos.page';

@NgModule({
  declarations: [HabitosPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HabitosPageRoutingModule
  ]
})
export class HabitosPageModule {}
