import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notas',
  standalone: false,
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
  
})
export class NotasPage {
  fechaSeleccionada: string = '';

  notasOriginales = [
    { fecha: '2025-06-17', titulo: 'Resumen reunión', cuerpo: 'Anotaciones importantes de la reunión.' },
    { fecha: '2025-06-18', titulo: 'Clase de estrategia', cuerpo: 'Ideas clave discutidas en clase.' },
    { fecha: '2025-06-19', titulo: 'Tareas pendientes', cuerpo: 'Revisar entregables del equipo.' }
  ];

  notas: any[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.fechaSeleccionada = params['fecha'] || '';
      this.filtrarNotasPorFecha();
    });
  }

  filtrarNotasPorFecha() {
    if (this.fechaSeleccionada) {
      this.notas = this.notasOriginales.filter(n => n.fecha === this.fechaSeleccionada);
    } else {
      this.notas = this.notasOriginales;
    }
  }
}

