// src/app/pages/notas/notas.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NotasPageRoutingModule } from './notas-routing.module';
import { NotasPage } from './notas.page';

@NgModule({
  declarations: [NotasPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotasPageRoutingModule
  ]
})
export class NotasPageModule {}
