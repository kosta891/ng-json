import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  baseUrl = environment.baseUrl;

  private users = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.users.asObservable();

  constructor(private http: HttpClient) {}

  setUsers() {
    this.http.get<User[]>(`${this.baseUrl}/users`).subscribe({
      next: (users: User[]): void => {
        this.users.next(users);
      },
    });
  }
}
