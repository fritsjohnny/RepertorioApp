import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ApiUrls } from '../common/api-urls';
import { Messenger } from '../common/messenger';
import { RepertoireSong } from '../models/repertoire-song.model';

@Injectable({ providedIn: 'root' })
export class RepertoireSongService {
  private http = inject(HttpClient);
  private messenger = inject(Messenger);

  getAll(): Observable<RepertoireSong[]> {
    return this.http
      .get<RepertoireSong[]>(ApiUrls.repertoireSongs)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  getById(id: number): Observable<RepertoireSong> {
    return this.http
      .get<RepertoireSong>(ApiUrls.repertoireSongById(id))
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  create(item: RepertoireSong): Observable<RepertoireSong> {
    return this.http
      .post<RepertoireSong>(ApiUrls.repertoireSongs, item)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  update(id: number, item: RepertoireSong): Observable<void> {
    return this.http
      .put<void>(ApiUrls.repertoireSongById(id), item)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(ApiUrls.repertoireSongById(id))
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }
}
