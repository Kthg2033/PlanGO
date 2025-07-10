import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';

interface Usuario {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  fechaNacimiento: string;
  email: string;
  codigoPais: string;
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
    codigoPais: '+56',
    telefono: '',
    pais: '',
    contrasena: ''
  };

  confirmarContrasena = '';
  fechaFormateada = '';

  // 👁️ Controlan si la contraseña se muestra (true) o está oculta (false)
  // eye-outline -> false (oculto), eye-off-outline -> true (mostrando)
  verPassword = false;
  verConfirmPassword = false;

  constructor(
    private toastController: ToastController,
    private router: Router,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();
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

  validarTelefono(event: any) {
    const input = event.target.value;
    // Solo números y máximo 9 dígitos
    this.usuario.telefono = input.replace(/\D/g, '').slice(0, 9);
  }

  validarContrasena(clave: string): boolean {
    // Al menos 8 caracteres, una mayúscula, un número y un símbolo
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(clave);
  }

  async registrar(formulario: NgForm) {
    console.log('Intentando registrar con datos:', this.usuario);

    // Validación campos vacíos
    if (!this.usuario.nombres || !this.usuario.apellidoPaterno || !this.usuario.apellidoMaterno ||
        !this.usuario.genero || !this.usuario.fechaNacimiento || !this.usuario.email ||
        !this.usuario.codigoPais || !this.usuario.telefono || !this.usuario.pais ||
        !this.usuario.contrasena || !this.confirmarContrasena) {
      this.mostrarToast('Por favor completa todos los campos', 'danger');
      return;
    }

    // Validación teléfono
    if ((this.usuario.telefono || '').length !== 9) {
      this.mostrarToast('El número debe tener exactamente 9 dígitos', 'danger');
      return;
    }

    // Validación contraseña fuerte
    if (!this.validarContrasena(this.usuario.contrasena)) {
      this.mostrarToast('La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo.', 'danger');
      return;
    }

    // Validación coincidencia contraseñas
    if (this.usuario.contrasena !== this.confirmarContrasena) {
      this.mostrarToast('Las contraseñas no coinciden', 'danger');
      return;
    }

    // Guardar con teléfono completo
    const telefonoCompleto = `${this.usuario.codigoPais}${this.usuario.telefono}`;
    const usuarioGuardado = { ...this.usuario, telefono: telefonoCompleto };

    await this.storage.set('usuario', usuarioGuardado);
    console.log('Usuario registrado y guardado en Storage:', usuarioGuardado);

    this.mostrarToast('¡Registro exitoso!', 'success');
    this.router.navigate(['/login']);
  }

  async mostrarToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}