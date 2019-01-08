import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/Post';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.less']
})
export class ApplicationComponent implements OnInit {

  constructor(public postService: PostsService, private cookieService: CookieService) {
    this.id = this.cookieService.get('id');
  }

  posts: Post[] = [];

  id: String;

  newPost: Post = new Post();

  img: string;

  addPost(post: Post) {
    post.author = this.cookieService.get('recivedUser');
    this.postService.addPost(post).subscribe(() => {
      return this.getPosts();
    });

    this.newPost = new Post();
    this.img = '';
  }

  getPosts() {
    return this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }

  deletePost(post: Post) {
    return this.postService.deletePost(post).subscribe(() => {
      return this.getPosts();
    });
  }

  root(post) {
    if (post.author === this.cookieService.get('recivedUser') || this.cookieService.get('root') === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  onImgCheck() {
    const arr = (this.newPost.text).split(' ');

    for (let i = 0; i < arr.length; i++) {
      // tslint:disable-next-line:no-bitwise
      if (~arr[i].indexOf('.jpg')) {
        this.img = arr[i];
      }
    }
  }

  onImgLoad() {
    this.newPost.img = this.img;

    const arr = (this.newPost.text).split(' ');

    for (let i = 0; i < arr.length; i++) {
      // tslint:disable-next-line:no-bitwise
      if (arr[i] === this.newPost.img) {
        arr.splice(i, 1);
      }
    }

    this.newPost.text = arr.join(' ');

  }

  onImgError() {
    this.img = this.newPost.img;
  }

  onImgDelete() {
    this.img = '';
    this.newPost.img = '';
  }

  ngOnInit() {
    return this.getPosts();
  }

  logout() {
    return this.cookieService.remove('recivedUser');
  }

}
