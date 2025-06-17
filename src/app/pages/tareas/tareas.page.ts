import { Component } from '@angular/core';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: false // deja claro que se usa con NgModule
})
export class TareasPage {
  tareas = [
    { descripcion: 'Estudiar', completado: false },
    { descripcion: 'Comprar comida', completado: false },
  ];
}
