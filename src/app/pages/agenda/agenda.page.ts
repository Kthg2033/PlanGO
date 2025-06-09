import { Component } from '@angular/core';

@Component({
  
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  
})
export class AgendaPage {
  eventos = [
    { hora: '09:00', descripcion: 'Reunión', completado: false },
    { hora: '14:00', descripcion: 'Clase', completado: false },
  ];
}
