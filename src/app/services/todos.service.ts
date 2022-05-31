import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTodos(id: string) {
    return this.http.get<Todo[]>(`${this.baseUrl}/users/${id}/todos`);
  }

  getSingleTodo(id: string) {
    return this.http.get<Todo>(`${this.baseUrl}/todos/${id}`);
  }
  deleteTodo(id: string) {
    return this.http.delete(`${this.baseUrl}/todos/${id}`);
  }

  editTodo(todo: Todo) {
    delete todo.editMode;
    return this.http.put<Todo>(`${this.baseUrl}/todos/${todo.id}`, {
      body: todo,
    });
  }

  addTodo(todo: Todo) {
    return this.http.post(`${this.baseUrl}/todos`, {
      body: todo,
    });
  }
}
