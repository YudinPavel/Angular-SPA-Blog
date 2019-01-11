import { Component, OnInit } from '@angular/core';
import { SearchUserService } from '../services/search-user.service';
import { ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { User } from '../models/User';
import { SignInService } from '../services/sign-in.service';
import { Post } from '../models/Post';
import { SearchPostService } from '../services/search-post.service';
import { CookieService } from 'angular2-cookie';
import { PostsService } from '../services/posts.service';
import { EditUserService } from '../services/edit-user.service';
import { Comment } from '../models/Comment';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.less']
})
export class UserPageComponent implements OnInit {

  id: string;

  newPost: Post = new Post();

  posts: Post[] = [];

  user: User = new User();

  gender: String = '';

  edit: Boolean = false;

  img: string;

  newComment: Comment = new Comment();

  subscription: Subscription;

  constructor(private activateRoute: ActivatedRoute,
              public searchUser: SearchUserService,
              public thisUser: SignInService,
              public searchPost: SearchPostService,
              public cookieService: CookieService,
              public postService: PostsService,
              public editUserService: EditUserService) {
    this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.searchUser.postSearchUserById(this.id).subscribe((user: User ) => {
      this.user = user;
      if (user.gender === true) {
        this.gender = 'Male';
      } else {
        this.gender = 'Female';
      }

      this.getPosts(user);

    });
  }

  rootForAddPost() {
    if (this.user.email === this.cookieService.get('recivedUser')) {
      return true;
    } else {
      return false;
    }
  }

  root(post) {
    if (post.author === this.cookieService.get('recivedUser') ||
    this.cookieService.get('root') === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  getPosts(user: User) {
    this.searchPost.searchPostByEmail(user).subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  deletePost(post: Post) {
    return this.postService.deletePost(post).subscribe(() => {
      return this.getPosts(this.user);
    });
  }

  addPost(post: Post) {
    post.author = this.cookieService.get('recivedUser');
    this.postService.addPost(post).subscribe(() => {
      return this.getPosts(this.user);
    });

    this.newPost = new Post();
    this.img = '';
  }

  editUser() {
    this.edit = !this.edit;
  }

  saveEdit() {

    this.editUserService.editUser(this.user).subscribe(() => {
      return this.edit = !this.edit;
    });
  }

  logout() {
    return this.cookieService.remove('recivedUser');
  }

  onSelect(post) {
    return post._id === this.newPost._id;
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

  editPost(post) {
    this.newPost = post;
    this.img = post.img;
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

  addComment(post: Post) {

    const numComment = post.comments.length;

    post.comments[numComment] = new Comment();

    post.comments[numComment].text = post.newComment;
    post.comments[numComment].author = this.cookieService.get('recivedUser');
    post.newComment = '';

    this.postService.addPost(post).subscribe(() => {
      return this.getPosts(this.user);
    });
  }

  deleteComment(post, numComment) {
    post.comments.splice(numComment, 1);

    this.postService.addPost(post).subscribe(() => {
      return this.getPosts(this.user);
    });
  }

}
