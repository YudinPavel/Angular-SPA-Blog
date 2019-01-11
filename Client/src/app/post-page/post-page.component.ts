import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/Post';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.less']
})
export class PostPageComponent implements OnInit {

  id: Number;

  post: Post = new Post();

  constructor(private cookieService: CookieService, private activateRoute: ActivatedRoute, private postService: PostsService) {
    activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.postService.getPostById(this.id).subscribe((date: Post) => {
      this.post = date;
    });
  }

  root(post) {
    if (post.author === this.cookieService.get('recivedUser') || this.cookieService.get('root') === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    return this.cookieService.remove('recivedUser');
  }

}
