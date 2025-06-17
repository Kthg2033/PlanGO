import { Component, ViewChild, ElementRef } from '@angular/core';
import { PerfilService } from 'src/app/services/perfil.service'; // RUTA CORRECTA

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false,
})
export class PerfilPage {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  fotoPerfil: string = '';
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';

  perfil = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    genero: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    pais: ''
  };

  constructor(private perfilService: PerfilService) {
    // Suscribirse al observable para mantener sincronizada la foto
    this.perfilService.fotoPerfil$.subscribe(url => {
      this.fotoPerfil = url;
    });
  }

  seleccionarFoto() {
    this.fileInput.nativeElement.click();
  }

  cargarFoto(event: Event) {
    const input = event.target as HTMLInputElement;
    const archivo = input.files?.[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onload = () => {
        this.fotoPerfil = lector.result as string;
        this.perfilService.setFotoPerfil(this.fotoPerfil); // sincroniza con menú
      };
      lector.readAsDataURL(archivo);
    }
  }

  guardarPerfil() {
    this.perfilService.setNombre(this.perfil.nombres); // sincroniza el nombre en el menú
    console.log('Perfil guardado:', this.perfil);
  }

  enviarVerificacionEmail() {
    alert('Se ha enviado un correo de verificación (simulado)');
  }

  cambiarContrasena() {
    if (!this.nuevaContrasena || !this.confirmarContrasena) {
      alert('Debes ingresar ambas contraseñas.');
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    alert('Contraseña actualizada exitosamente (simulado)');
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
  }
}
