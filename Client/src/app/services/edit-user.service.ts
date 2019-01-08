import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private httpClient: HttpClient) { }

  url = 'http://localhost:3000/edituser';

  editUser(user: User) {
    const body = user;
    return this.httpClient.post(this.url, body);
  }
}
