import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  standalone:false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  usuario = '';
  password = '';
  mostrarContrasena = false;

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async login(): Promise<void> {
    const valido = this.usuario.length > 2 && /^[0-9]{4}$/.test(this.password);
    if (valido) {
      this.perfilService.setNombre(this.usuario);
      this.authService.login(this.usuario);
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.presentToast('Usuario o contraseña inválidos');
    }
  }

  togglePasswordVisibility() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  }
}
