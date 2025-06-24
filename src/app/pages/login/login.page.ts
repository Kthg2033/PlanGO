import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service'; 

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private perfilService: PerfilService 
  ) {}

  login() {
    if (this.usuario.length >= 3 && this.usuario.length <= 8 && /^[0-9]{4}$/.test(this.password)) {
      this.perfilService.setNombre(this.usuario); 
      this.router.navigate(['/home'], {
        queryParams: { usuario: this.usuario }
      });
    } else {
      alert('Datos inválidos');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
