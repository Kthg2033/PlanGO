import { Component } from '@angular/core';

@Component({
  selector: 'app-habitos',
  templateUrl: './habitos.page.html',
  styleUrls: ['./habitos.page.scss'],
  standalone: false // explícitamente no standalone
})
export class HabitosPage {
  habitos = [
    { nombre: 'Leer', cumplido: false },
    { nombre: 'Tomar agua', cumplido: false },
    { nombre: 'Ejercitar', cumplido: false },
  ];
}
