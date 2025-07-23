import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ApiUrls } from '../common/api-urls';
import { Messenger } from '../common/messenger';
import { Repertoire } from '../models/repertoire.model';

@Injectable({ providedIn: 'root' })
export class RepertoireService {
  private http = inject(HttpClient);
  private messenger = inject(Messenger);

  getAll(): Observable<Repertoire[]> {
    return this.http
      .get<Repertoire[]>(ApiUrls.repertoires)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  getById(id: number): Observable<Repertoire> {
    return this.http
      .get<Repertoire>(ApiUrls.repertoireById(id))
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  create(repertoire: Repertoire): Observable<Repertoire> {
    return this.http
      .post<Repertoire>(ApiUrls.repertoires, repertoire)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  update(id: number, repertoire: Repertoire): Observable<void> {
    return this.http
      .put<void>(ApiUrls.repertoireById(id), repertoire)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(ApiUrls.repertoireById(id))
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }
}
