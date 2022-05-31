import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  post: Post = { title: '', body: '', userId: '', id: '' };
  comments: Comment[] = [];
  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id') as string;

    this.postService.getSinglePost(routeId).subscribe({
      next: (post) => {
        this.post = post;
      },
    });

    this.postService.getSinglePostComments(routeId).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
    });
  }
}
