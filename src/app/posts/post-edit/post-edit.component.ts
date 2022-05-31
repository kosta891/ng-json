import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
})
export class PostEditComponent implements OnInit {
  id = '';

  postForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });

  constructor(
    private postService: PostsService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params): void => {
      if (params['id']) {
        this.id = params['id'];
      }

      if (this.id) {
        let title = '';
        let body = '';

        this.postService.getSinglePost(this.id).subscribe({
          next: (post): void => {
            title = post.title;
            body = post.body;

            this.postForm = new FormGroup({
              title: new FormControl(title, Validators.required),
              body: new FormControl(body, Validators.required),
            });
          },
        });
      }
    });
  }

  onAddPost(): void {
    if (this.postForm.valid) {
      if (!this.id) {
        this.postService
          .addPost(this.postForm.value.title, this.postForm.value.body)
          .subscribe({
            next: (): void => {
              this.back();
            },
          });
        this.postForm.reset();
      }
      if (this.id) {
        this.postService
          .updatePost(
            this.postForm.value.title,
            this.postForm.value.body,
            this.id
          )
          .subscribe({
            next: (): void => {
              this.back();
            },
          });
      }
    }
  }

  back(): void {
    this.location.back();
  }
}
