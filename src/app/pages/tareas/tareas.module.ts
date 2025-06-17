// src/app/pages/tareas/tareas.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { TareasPage } from './tareas.page';

const routes: Routes = [
  { path: '', component: TareasPage }
];

@NgModule({
  declarations: [TareasPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class TareasPageModule {}
