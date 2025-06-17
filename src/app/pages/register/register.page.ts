import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  usuario = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    genero: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    pais: ''
  };

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

  guardarFecha(event: Event) {
    const customEvent = event as CustomEvent;
    const valor = customEvent.detail.value;
    this.usuario.fechaNacimiento = valor;

    const fecha = new Date(valor);
    const opciones: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };
    this.fechaFormateada = fecha.toLocaleDateString('es-CL', opciones);
  }
}
