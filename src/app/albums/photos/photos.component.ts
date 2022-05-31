import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photo } from 'src/app/models/photo.model';
import { AlbumsService } from '../../services/albums.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
  photos$: Observable<Photo[]> = this.albumsService.photos$;
  constructor(
    private albumsService: AlbumsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id') as string;
    this.albumsService.getAlbumPhotos(routeId);
  }
}
