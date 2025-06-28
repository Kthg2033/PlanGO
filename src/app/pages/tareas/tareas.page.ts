import { Component, OnInit } from '@angular/core';

interface Tarea {
  titulo: string;
  completada: boolean;
  editando: boolean;
}

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: false,
})
export class TareasPage implements OnInit {
  tareas: Tarea[] = [];
  nuevaTarea: string = '';

  constructor() {}

  ngOnInit() {
    this.cargarTareas();
  }

  agregarTarea() {
    if (!this.nuevaTarea.trim()) return;

    this.tareas.push({
      titulo: this.nuevaTarea.trim(),
      completada: false,
      editando: false
    });
    this.nuevaTarea = '';
    this.guardarTareas();
  }

  eliminarTarea(index: number) {
    this.tareas.splice(index, 1);
    this.guardarTareas();
  }

  toggleCompletada(index: number) {
    this.tareas[index].completada = !this.tareas[index].completada;
    this.guardarTareas();
  }

  editarTarea(index: number) {
    this.tareas[index].editando = true;
  }

  guardarEdicion(index: number) {
    this.tareas[index].editando = false;
    this.guardarTareas();
  }

  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  cargarTareas() {
    const data = localStorage.getItem('tareas');
    if (data) this.tareas = JSON.parse(data);
  }
}
