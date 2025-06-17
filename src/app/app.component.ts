import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PerfilService } from './services/perfil.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  fotoPerfil: string = '';
  nombreUsuario: string = '';

  private subs = new Subscription();

  constructor(private router: Router, private perfilService: PerfilService) {
    // Inicialización básica si no hay datos almacenados todavía
  }

  ngOnInit(): void {
    this.subs.add(this.perfilService.fotoPerfil$.subscribe(foto => {
      this.fotoPerfil = foto;
    }));

    this.subs.add(this.perfilService.nombre$.subscribe(nombre => {
      this.nombreUsuario = nombre;
    }));
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}



