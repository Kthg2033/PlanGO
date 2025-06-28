import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { SQLiteService } from './sqlite.service';
import { Todo } from '../models/todo.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(
    private http: HttpClient,
    private sqliteService: SQLiteService
  ) {}

  async getTodos(): Promise<Todo[]> {
    const { connected } = await Network.getStatus();

    if (connected) {
      try {
        const todos = await firstValueFrom(this.http.get<Todo[]>(`${this.baseUrl}/todos`));
        if (todos) {
          await this.sqliteService.saveTodos(todos);
          return todos;
        }
      } catch (e) {
        console.warn('Error al obtener datos desde API, usando SQLite.');
      }
    }

    return await this.sqliteService.getTodos();
  }
}
