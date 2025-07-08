import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tarea } from '../../models/tarea.model';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
  standalone: false,
})
export class TareasPage implements OnInit {
  tareas: Tarea[] = [];
  showConfetti = false;
  confettiPieces = Array(30);

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.cargarTareas();
  }

  ionViewWillEnter() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
  }

  guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  agregarTarea() {
    this.router.navigate(['/tarea-form']);
  }

  editarTarea(tarea: Tarea) {
    this.router.navigate(['/tarea-form', tarea.id]);
  }

  eliminarTarea(id: number) {
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.guardarTareas();
    this.mostrarToast('Tarea eliminada');
    this.verificarLogroGlobal();
  }

  toggleCompletada(tarea: Tarea) {
    if (!tarea.completada) {
      tarea.completada = true;
      tarea.puntos = 10;
      tarea.racha = 1;
    } else {
      tarea.completada = false;
      tarea.puntos = 0;
      tarea.racha = 0;
    }
    this.guardarTareas();
    this.verificarLogroGlobal(); // 💡 verifica los puntos globales cada vez
  }

  getTotalPuntos() {
    return this.tareas.reduce((total, tarea) => total + tarea.puntos, 0);
  }

  getTotalRacha() {
    return this.tareas.reduce((total, tarea) => total + tarea.racha, 0);
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }

  async verificarLogroGlobal() {
    const totalPuntos = this.getTotalPuntos();
    let mensaje = '';

    if (totalPuntos >= 100) {
      mensaje = '¡Wow! Has llegado a 100 puntos, eso demuestra constancia.';
      this.lanzarConfetti();
    } else if (totalPuntos >= 50) {
      mensaje = '¡Estás haciendo un gran trabajo! Alcanzaste 50 puntos.';
    } else if (totalPuntos >= 30) {
      mensaje = '¡Buen avance! Ya llevas 30 puntos. Sigue así.';
    }

    if (mensaje) {
      const toast = await this.toastCtrl.create({
        message: mensaje,
        duration: 2500,
        color: 'tertiary',
        position: 'top'
      });
      await toast.present();
    }
  }

  lanzarConfetti() {
    this.showConfetti = true;
    setTimeout(() => {
      this.showConfetti = false;
    }, 3000);
  }

  volverAtras() {
    this.navCtrl.navigateBack('/home');
  }

  trackById(index: number, tarea: Tarea) {
    return tarea.id;
  }
}
