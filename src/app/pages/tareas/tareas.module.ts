import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TareasPage } from './tareas.page';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TareasPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: TareasPage }])
  ]
})
export class TareasPageModule {}
