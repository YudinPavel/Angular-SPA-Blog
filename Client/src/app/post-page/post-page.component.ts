import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/Post';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.less']
})
export class PostPageComponent implements OnInit {

  id: Number;

  post: Post = new Post();

  constructor(private activateRoute: ActivatedRoute, private postService: PostsService) {
    activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit() {
    this.postService.getPostById(this.id).subscribe((date: Post) => {
      this.post = date;
    });
  }

}
