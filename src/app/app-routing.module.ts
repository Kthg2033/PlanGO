import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'agenda',
    loadComponent: () => import('./pages/agenda/agenda.page').then(m => m.AgendaPage)
  },
  {
    path: 'tareas',
    loadComponent: () => import('./pages/tareas/tareas.page').then(m => m.TareasPage)
  },
  {
    path: 'habitos',
    loadComponent: () => import('./pages/habitos/habitos.page').then(m => m.HabitosPage)
  },
  {
    path: 'notas',
    loadComponent: () => import('./pages/notas/notas.page').then(m => m.NotasPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
