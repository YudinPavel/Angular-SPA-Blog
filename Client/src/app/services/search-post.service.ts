import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SearchPostService {

  url = 'http://localhost:3000/getpostsbyemail';

  constructor(private httpClient: HttpClient) { }

  searchPostByEmail(user: User) {
    const body = user;

    return this.httpClient.post(this.url, body);
  }
}
