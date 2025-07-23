import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ApiUrls } from '../common/api-urls';
import { User } from '../models/user.model';
import { Messenger } from '../common/messenger';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private messenger = inject(Messenger);

  getAll(): Observable<User[]> {
    return this.http
      .get<User[]>(ApiUrls.users)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  getById(id: number): Observable<User> {
    return this.http
      .get<User>(ApiUrls.userById(id))
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  create(user: User): Observable<User> {
    return this.http
      .post<User>(ApiUrls.users, user)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  update(id: number, user: User): Observable<void> {
    return this.http
      .put<void>(ApiUrls.userById(id), user)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(ApiUrls.userById(id))
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }
}
