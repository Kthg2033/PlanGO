import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PerfilService } from './services/perfil.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';



interface AppPage {
  title: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit, OnDestroy {
  fotoPerfil = '';
  nombreUsuario = '';
  showMenu = true; // 👈 para ocultar menú cuando sea necesario

  appPages: AppPage[] = [
    { title: 'Inicio',  url: '/home',    icon: 'home' },
    { title: 'Agenda',  url: '/agenda',  icon: 'calendar' },
    { title: 'Tareas',  url: '/tareas',  icon: 'list' },
    { title: 'Hábitos', url: '/habitos', icon: 'checkmark-circle' },
    { title: 'Notas',   url: '/notas',   icon: 'document' },
    { title: 'Perfil',  url: '/perfil',  icon: 'person' },
  ];

  private subs = new Subscription();

  constructor(
    private router: Router,
    private perfilService: PerfilService
  ) {}

  ngOnInit(): void {
    this.subs.add(this.perfilService.fotoPerfil$.subscribe(f => this.fotoPerfil = f));
    this.subs.add(this.perfilService.nombre$.subscribe(n => this.nombreUsuario = n));

    // 👇 Detecta ruta para mostrar u ocultar el menú
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.showMenu = !url.includes('/login') && !url.includes('/register');
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
