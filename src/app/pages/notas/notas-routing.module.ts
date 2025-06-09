import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotasPage } from './notas.page';   // <== Nombre correcto

const routes: Routes = [
  {
    path: '',
    component: NotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotasPageRoutingModule {}
