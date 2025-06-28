import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventModalComponent } from '../../components/evento-modal/event-modal.component';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth'
    },
    dateClick: this.onDateClick.bind(this),
    eventClick: this.onEventClick.bind(this),
    events: []
  };

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const guardados = localStorage.getItem('eventos');
    if (guardados) {
      this.calendarOptions.events = JSON.parse(guardados);
    }
  }

  async onDateClick(arg: any) {
    const modal = await this.modalCtrl.create({
      component: EventModalComponent,
      componentProps: {
        date: arg.dateStr
      }
    });

    modal.onDidDismiss().then(result => {
      if (result.data) {
        const data = result.data;
        const nuevoEvento = {
          title: data.titulo,
          start: `${data.date}T${data.horaInicio}`,
          end: `${data.date}T${data.horaFin}`,
          color: '#3788d8',
          extendedProps: {
            ubicacion: data.ubicacion,
            notas: data.notas,
            repetir: data.repetir
          }
        };

        const actuales = this.calendarOptions.events as any[] || [];
        const actualizados = [...actuales, nuevoEvento];

        // Forzar actualización
        this.calendarOptions = {
          ...this.calendarOptions,
          events: [...actualizados]
        };

        localStorage.setItem('eventos', JSON.stringify(actualizados));
      }
    });

    await modal.present();
  }

  async onEventClick(info: any) {
    const evento = info.event;
    const props = evento.extendedProps;

    const fecha = new Date(evento.start).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const mensaje = 
`📅 Fecha: ${fecha}
📍 Ubicación: ${props.ubicacion || '—'}
📝 Notas: ${props.notas || '—'}
🔁 Repetir: ${props.repetir || '—'}
⏰ Desde: ${new Date(evento.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
⏳ Hasta: ${new Date(evento.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`;

    const alert = await this.alertCtrl.create({
      header: `📌 ${evento.title}`,
      message: mensaje.replace(/\n/g, '<br>'),
      buttons: [
        {
          text: '🗑 Eliminar',
          role: 'destructive',
          handler: () => this.eliminarEvento(evento)
        },
        {
          text: 'Cerrar',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  eliminarEvento(evento: any) {
    const eventosActuales = this.calendarOptions.events as any[];

    const actualizados = eventosActuales.filter(ev => {
      return !(
        ev.title === evento.title &&
        new Date(ev.start).toISOString() === evento.start.toISOString()
      );
    });

    this.calendarOptions = {
      ...this.calendarOptions,
      events: [...actualizados]
    };

    localStorage.setItem('eventos', JSON.stringify(actualizados));
  }
}
