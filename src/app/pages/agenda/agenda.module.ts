import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AgendaPage } from './agenda.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AgendaPage  // ✅ Importas en vez de declarar
  ]
})
export class AgendaPageModule {}

 