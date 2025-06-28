import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly USER_KEY = 'user'; // Clave fija para evitar errores tipográficos

  /** ✅ Verifica si hay usuario logueado */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.USER_KEY);
  }

  /** ✅ Inicia sesión almacenando un valor simple */
  login(username: string): void {
    localStorage.setItem(this.USER_KEY, username);
  }

  /** ✅ Cierra sesión eliminando la clave */
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  /** ✅ Devuelve el nombre de usuario (si hay uno) */
  getUsername(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }
}
