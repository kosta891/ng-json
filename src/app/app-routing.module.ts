import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { PhotosComponent } from './albums/photos/photos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostsComponent } from './posts/posts.component';
import { TodosComponent } from './todos/todos.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UsersComponent } from './users/users.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: 'users',
    component: UsersComponent,

    children: [
      { path: '', component: UserListComponent },

      {
        path: ':id/albums',
        component: AlbumsComponent,
      },

      { path: ':id/todos', component: TodosComponent },
      { path: ':id/posts', component: PostsComponent },
    ],
  },

  { path: 'albums/:id/photos', component: PhotosComponent },
  { path: 'posts/new', component: PostEditComponent },
  { path: 'posts/:id/edit', component: PostEditComponent },
  { path: 'posts/:id', component: PostDetailComponent },

  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
