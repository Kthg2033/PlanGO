import { Component } from '@angular/core';

@Component({
  selector: 'app-notas',

  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage {
  notas = [
    { titulo: 'Idea de app', cuerpo: 'Crear app de agenda personal' },
    { titulo: 'Recordatorio', cuerpo: 'Comprar materiales' }
  ];
}
