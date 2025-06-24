import { Component } from '@angular/core';
import { HabitosService, Habito } from 'src/app/services/habitos.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-habitos',
  templateUrl: './habitos.page.html',
  styleUrls: ['./habitos.page.scss'],
  standalone: false
})
export class HabitosPage {
  habitos: Habito[] = [];

  filtroPrioridad: 'Todas' | 'Alta' | 'Media' | 'Baja' = 'Todas';
  filtroFrecuencia: 'Todas' | 'Diario' | 'Semanal' = 'Todas';

  constructor(
    private habitosService: HabitosService,
    private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.habitos = this.habitosService.getAll();
  }

  get habitosFiltrados(): Habito[] {
    return this.habitos.filter(h =>
      (this.filtroPrioridad === 'Todas' || h.prioridad === this.filtroPrioridad) &&
      (this.filtroFrecuencia === 'Todas' || h.frecuencia === this.filtroFrecuencia)
    );
  }

  async agregarHabito() {
    const alert = await this.alertController.create({
      header: 'Nuevo Hábito',
      inputs: [
        {
          type: 'text',
          name: 'nombre',
          placeholder: 'Nombre del hábito'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Agregar',
          handler: (data) => {
            if (!data.nombre?.trim()) return false;

            const nuevo: Habito = {
              id: this.generarID(),
              nombre: data.nombre.trim(),
              prioridad: 'Media',          
              frecuencia: 'Diario',        
              completado: false,
              fecha: '',
              racha: 0
            };

            this.habitosService.add(nuevo);
            this.habitos = this.habitosService.getAll();
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  toggleCompletado(h: Habito) {
    h.completado = !h.completado;
    h.fecha = new Date().toISOString().split('T')[0];
    this.habitosService.update(h);
  }

  eliminarHabito(h: Habito) {
    this.habitosService.remove(h.id);
    this.habitos = this.habitosService.getAll();
  }

  private generarID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }
}
