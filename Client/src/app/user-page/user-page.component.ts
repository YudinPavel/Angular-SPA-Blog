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
  }

  editUser() {
    this.edit = !this.edit;
  }

  saveEdit() {

    this.editUserService.editUser(this.user).subscribe(() => {
      return this.edit = !this.edit;
    });
  }

}
