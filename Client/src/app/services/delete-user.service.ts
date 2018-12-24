import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  constructor(private httpClient: HttpClient) { }

  url = 'http://localhost:3000/deleteuser';

  deleteUser(user: User) {
    const body = user;
    return this.httpClient.post(this.url, body);
  }

}
