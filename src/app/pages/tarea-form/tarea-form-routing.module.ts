import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TareaFormPage } from './tarea-form.page';
import { AuthGuard } from '../../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TareaFormPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareaFormPageRoutingModule {}
