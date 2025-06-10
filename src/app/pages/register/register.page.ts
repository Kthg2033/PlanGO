// pages/register/register.page.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  
})
export class RegisterPage {
  usuario  = 'jose tapia';
  password = '123456';

  registrar() {
    if (this.usuario.trim() && this.password.trim()) {
      alert('¡Usuario registrado!');
    } else {
      alert('Por favor completa todos los campos.');
    }
  }
}

