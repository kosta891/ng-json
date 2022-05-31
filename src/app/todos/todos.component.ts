import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../models/todo.model';
import { TodosService } from '../services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  newTodo = '';
  constructor(
    private todosService: TodosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id') as string;
    this.todosService.getTodos(routeId).subscribe({
      next: (todos): void => {
        this.todos = todos;
        this.todos.forEach((todo) => {
          todo.editMode = false;
        });
      },
    });
  }

  onChecked(todo: Todo): void {
    this.todosService.editTodo(todo).subscribe(() => console.log('edited'));
  }

  onDeleteTodo(id: string): void {
    this.todosService.deleteTodo(id).subscribe({
      next: () => (this.todos = this.todos.filter((todo) => todo.id !== id)),
    });
  }

  onEnableEdit(todo: Todo): void {
    todo.editMode = true;
  }

  onSave(todo: Todo): void {
    delete todo.editMode;
    this.todosService.editTodo(todo).subscribe(() => console.log('edited'));
  }

  onClose(t: Todo) {
    t.editMode = false;

    this.todosService.getSingleTodo(t.id).subscribe({
      next: (todo) => {
        this.todos = this.todos.map((singleTodo) => {
          if (singleTodo.id === todo.id) {
            singleTodo.title = todo.title;
            todo.completed = singleTodo.completed;
            return singleTodo;
          }
          return singleTodo;
        });
      },
    });
  }

  onNewTodo(): void {
    let { userId, id } = this.todos[this.todos.length - 1];
    if (!this.newTodo || this.newTodo.trim().length === 0) {
      return;
    }
    this.todos.push({
      userId,
      id: id + 1,
      title: this.newTodo,
      completed: false,
    });

    this.todosService
      .addTodo(this.todos[this.todos.length - 1])
      .subscribe(() => console.log('addedTodo'));

    this.newTodo = '';
  }
}
