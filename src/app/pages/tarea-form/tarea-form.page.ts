import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-tarea-form',
  templateUrl: './tarea-form.page.html',
  styleUrls: ['./tarea-form.page.scss'],
  standalone: false,
})
export class TareaFormPage implements OnInit {
  tareaForm!: FormGroup;
  tareaId: number | null = null;
  editMode: boolean = false;
  tareas: Tarea[] = [];

  prioridades = ['Alta', 'Media', 'Baja'];
  categorias = ['Salud', 'Productividad', 'Hogar', 'Finanzas', 'Estudio'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.tareaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      prioridad: ['', Validators.required],
      categoria: ['', Validators.required],
      fechaSugerida: [''],
      notas: [''],
      completada: [false],
      puntos: [0],
      racha: [0]
    });

    this.tareas = JSON.parse(localStorage.getItem('tareas') || '[]');

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.tareaId = +idParam;
      this.editMode = true;

      const tareaExistente = this.tareas.find(t => t.id === this.tareaId);
      if (tareaExistente) {
        this.tareaForm.patchValue(tareaExistente);
      }
    }
  }

  guardar(): void {
    console.log('🟢 Guardar presionado con datos:', this.tareaForm.value);

    if (!this.tareaForm.valid) {
      console.log('❌ Formulario inválido:', this.tareaForm.value);
      return;
    }

    if (this.editMode && this.tareaId !== null) {
      const index = this.tareas.findIndex(t => t.id === this.tareaId);
      if (index !== -1) {
        this.tareas[index] = { ...this.tareaForm.value, id: this.tareaId };
      }
      console.log('✍ Tarea actualizada:', this.tareas[index]);
    } else {
      const nuevaTarea: Tarea = {
        ...this.tareaForm.value,
        id: new Date().getTime() // id único
      };
      this.tareas.unshift(nuevaTarea);
      console.log('🆕 Tarea creada:', nuevaTarea);
    }

    localStorage.setItem('tareas', JSON.stringify(this.tareas));
    this.router.navigate(['/tareas']);
  }
}
