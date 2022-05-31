import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postsSevice: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id') as string;

    this.postsSevice.getPosts(routeId).subscribe({
      next: (posts): void => {
        this.posts = posts;
      },
    });
  }

  onDeletePost(id: string): void {
    this.postsSevice.deletePost(id).subscribe({
      next: (): void => {
        this.posts = this.posts.filter((post) => post.id !== id);
      },
    });
  }
}
