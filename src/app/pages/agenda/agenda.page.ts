import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-agenda',
  standalone: false,
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss']
})
export class AgendaPage implements OnInit {
  eventos: any[] = [];

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    const guardados = await this.storage.get('eventos');
    if (guardados) {
      this.eventos = guardados;

      // Ordenar por fecha
      this.eventos.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    }
  }
}