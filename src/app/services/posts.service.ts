import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getPosts(id: string) {
    return this.http.get<Post[]>(`${this.baseUrl}/users/${id}/posts`);
  }

  getSinglePost(id: string) {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  getSinglePostComments(id: string) {
    return this.http.get<Comment[]>(`${this.baseUrl}/posts/${id}/comments`);
  }

  deletePost(id: string) {
    return this.http.delete<Post>(`${this.baseUrl}/posts/${id}`);
  }

  addPost(body: string, title: string) {
    return this.http.post<Post>(`${this.baseUrl}/posts`, {
      body,
      title,
    });
  }

  updatePost(title: string, body: string, id: string) {
    return this.http.patch<Post>(`${this.baseUrl}/posts/${id}`, {
      body,
      title,
      id,
    });
  }
}
