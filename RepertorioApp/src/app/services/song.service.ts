import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ApiUrls } from '../common/api-urls';
import { Messenger } from '../common/messenger';
import { Song } from '../models/song.model';

@Injectable({ providedIn: 'root' })
export class SongService {
  private http = inject(HttpClient);
  private messenger = inject(Messenger);

  getAll(): Observable<Song[]> {
    return this.http
      .get<Song[]>(ApiUrls.songs)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  getById(id: number): Observable<Song> {
    return this.http
      .get<Song>(ApiUrls.songById(id))
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  create(song: Song): Observable<Song> {
    return this.http
      .post<Song>(ApiUrls.songs, song)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  update(id: number, song: Song): Observable<void> {
    return this.http
      .put<void>(ApiUrls.songById(id), song)
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(ApiUrls.songById(id))
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }

  search(title?: string, theme?: string, tags?: string): Observable<Song[]> {
    const params = new HttpParams()
      .set('title', title ?? '')
      .set('theme', theme ?? '')
      .set('tags', tags ?? '');

    return this.http
      .get<Song[]>(`${ApiUrls.songs}/search`, { params })
      .pipe(catchError(e => this.messenger.errorHandler(e)));
  }
}
