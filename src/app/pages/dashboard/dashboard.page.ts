import { Component, OnInit } from '@angular/core';
import { Tarea } from '../../models/tarea.model';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone:false,
})
export class DashboardPage implements OnInit {
  tareas: Tarea[] = [];
  pointsByDay = [0, 0, 0, 0, 0, 0, 0];

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      { data: this.pointsByDay, label: 'Puntos por día' }
    ]
  };

  constructor() {}

  ngOnInit() {
    this.cargarDatos();
  }

  ionViewWillEnter() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    this.procesarTareas();
  }

  procesarTareas() {
    this.pointsByDay = [0, 0, 0, 0, 0, 0, 0];

    for (let tarea of this.tareas) {
      if (tarea.completada && tarea.fechaSugerida) {
        const fecha = this.parsearFecha(tarea.fechaSugerida);
        if (!isNaN(fecha.getTime())) {
          const day = fecha.getDay(); // 0=Dom
          let index = day === 0 ? 6 : day - 1;
          this.pointsByDay[index] += tarea.puntos;
        }
      }
    }

    this.barChartData.datasets[0].data = this.pointsByDay;
  }

  parsearFecha(fechaStr: string): Date {
    // Intento convertir fechas tipo "7/8/25" a un Date legible
    let partes = fechaStr.split('/');
    if (partes.length === 3) {
      let [d, m, y] = partes;
      return new Date(Number(`20${y}`), Number(m)-1, Number(d));
    }
    // fallback
    return new Date(fechaStr);
  }

  totalPuntos(): number {
    return this.tareas.reduce((sum, tarea) => sum + tarea.puntos, 0);
  }

  totalRacha(): number {
    return this.tareas.reduce((sum, tarea) => sum + tarea.racha, 0);
  }
}
