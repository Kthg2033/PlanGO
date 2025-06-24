import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventosService } from 'src/app/services/eventos.service';
import { EventoModalComponent } from 'src/app/components/evento-modal/evento-modal.component';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    dateClick: (arg) => this.abrirModal(arg.dateStr),
    events: []
  };

  constructor(
    private modalCtrl: ModalController,
    private eventosService: EventosService
  ) {}

  async abrirModal(fecha: string) {
    const modal = await this.modalCtrl.create({
      component: EventoModalComponent,
      componentProps: { fechaSeleccionada: fecha }
    });

    modal.onDidDismiss().then(res => {
      if (res.data) {
        const nuevoEvento = {
          title: res.data.titulo,
          start: res.data.fechaInicio,
          end: res.data.fechaFin,
          fecha: fecha,
          hora: new Date(res.data.fechaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          descripcion: res.data.titulo,
          completado: 'No'
        };

        const eventos = Array.isArray(this.calendarOptions.events) ? this.calendarOptions.events : [];
        this.calendarOptions.events = [...eventos, nuevoEvento];
        this.eventosService.agregarEvento(nuevoEvento); // 
      }
    });

    await modal.present();
  }
}

