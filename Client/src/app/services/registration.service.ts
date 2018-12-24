import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  url = 'http://localhost:3000/registration';


  // Регистрирует пользователя
  postRegistration(user: User) {
    const body = user;
    return this.httpClient.post(this.url, body);
  }

}
