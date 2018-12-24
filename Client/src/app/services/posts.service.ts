import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { }

  url = 'http://localhost:3000/addpost';

  getUrl = 'http://localhost:3000/getposts';

  deleteUrl = 'http://localhost:3000/deletepost';

  getById = 'http://localhost:3000/getpostbyid';

  // Добавляет пост
  addPost(post: Post): Observable<Post> {
    const body = post;

    return this.httpClient.post<Post>(this.url, body).pipe();
  }

  // Возвращает список постов
  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.getUrl).pipe();
  }

  getPostById(id: Number): Observable<Post> {
    const body = {'id': id};
    return this.httpClient.post<Post>(this.getById, body).pipe();
  }

  // Удаляет пост по id
  deletePost(post: Post): Observable<Post> {
    const body = {'id': post._id};
    return this.httpClient.post<Post>(this.deleteUrl, body).pipe();
  }

}
