import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { IonicModule }          from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { AgendaPage }           from './agenda.page';

const routes: Routes = [
  { path: '', component: AgendaPage },
];

@NgModule({
  declarations: [AgendaPage],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
})
export class AgendaPageModule {}

