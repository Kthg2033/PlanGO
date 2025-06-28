import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Asegúrate de que exista este guard

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🌐 Rutas públicas
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module')
      .then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module')
      .then(m => m.RegisterPageModule)
  },

  // 🔒 Rutas protegidas con AuthGuard
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module')
      .then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'agenda',
    loadChildren: () => import('./pages/agenda/agenda.module')
      .then(m => m.AgendaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tareas',
    loadChildren: () => import('./pages/tareas/tareas.module')
      .then(m => m.TareasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'habitos',
    loadChildren: () => import('./pages/habitos/habitos.module')
      .then(m => m.HabitosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notas',
    loadChildren: () => import('./pages/notas/notas.module')
      .then(m => m.NotasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module')
      .then(m => m.PerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ubicacion',
    loadChildren: () => import('./pages/ubicacion/ubicacion.module')
      .then(m => m.UbicacionPageModule),
    canActivate: [AuthGuard] // O quítalo si quieres que sea pública
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
