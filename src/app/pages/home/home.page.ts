// src/app/pages/home/home.page.ts
import { Component } from '@angular/core';

@Component({
  
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  
})
export class HomePage {
  tareasCompletadas = 3;
  habitosCumplidos = 5;
  eventosHoy = 2;
}
