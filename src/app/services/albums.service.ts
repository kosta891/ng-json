import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../models/album.model';
import { Photo } from '../models/photo.model';

@Injectable({ providedIn: 'root' })
export class AlbumsService {
  private albums = new BehaviorSubject<Album[]>([]);
  albums$: Observable<Album[]> = this.albums.asObservable();

  private photos = new BehaviorSubject<Photo[]>([]);
  photos$ = this.photos.asObservable();

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAlbums(id: string) {
    this.http
      .get<Album[]>(`${this.baseUrl}/users/${id}/albums`)
      .subscribe((albums: Album[]): void => {
        this.albums.next(albums);
      });
  }

  getAlbumPhotos(id: string) {
    this.http
      .get<Photo[]>(`${this.baseUrl}/albums/${id}/photos`)
      .subscribe((photos: Photo[]): void => {
        this.photos.next(photos);
      });
  }
}
