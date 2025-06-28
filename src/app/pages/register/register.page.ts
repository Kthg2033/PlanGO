import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

interface Usuario {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  fechaNacimiento: string;
  email: string;
  telefono: string;
  pais: string;
  contrasena: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  usuario: Usuario = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    genero: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    pais: '',
    contrasena: ''
  };

  confirmarContrasena = '';
  fechaFormateada = '';

  constructor(
    private toastController: ToastController,
    private router: Router
  ) {}

  async registrar(formulario: NgForm) {
    if (formulario.invalid) return;

    console.log('Datos enviados:', this.usuario);

    const toast = await this.toastController.create({
      message: '¡Registro exitoso!',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();

    this.router.navigate(['/login']);
  }

  guardarFecha(event: CustomEvent) {
    const valor = event.detail.value;
    this.usuario.fechaNacimiento = valor;

    const fecha = new Date(valor);
    this.fechaFormateada = fecha.toLocaleDateString('es-CL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
