import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agenda',
  standalone: true,
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule]
})
export class AgendaPage {
  fechaSeleccionada: string = '';

  eventosOriginales = [
    { fecha: '2025-06-17', hora: '09:00', descripcion: 'Reunión', completado: 'No' },
    { fecha: '2025-06-18', hora: '14:00', descripcion: 'Clase', completado: 'No' }
  ];

  eventos: any[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.fechaSeleccionada = params['fecha'] || '';
      this.filtrarEventosPorFecha();
    });
  }

  filtrarEventosPorFecha() {
    if (this.fechaSeleccionada) {
      this.eventos = this.eventosOriginales.filter(e => e.fecha === this.fechaSeleccionada);
    } else {
      this.eventos = this.eventosOriginales;
    }
  }
}





