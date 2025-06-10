import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NotasPageRoutingModule } from './notas-routing.module';
import { NotasPage } from './notas.page';   // Aquí debe decir NotasPage

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    NotasPageRoutingModule
  ],
  declarations: [NotasPage]   // Aquí también NotasPage
})
export class NotasPageModule {}

