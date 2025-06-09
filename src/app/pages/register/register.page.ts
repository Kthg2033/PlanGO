import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({

  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  
})
export class RegisterPage {
  usuario = '';
  password = '';

  constructor(private router: Router) {}

  registrar() {
    alert('¡Usuario registrado!');
    this.router.navigate(['/login']);
  }
}
