import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchUserService {

  constructor(private httpClient: HttpClient) {
  }

  url = 'http://localhost:3000/search';

  urlId = 'http://localhost:3000/searchbyid';

  user: Observable<User>;

  // Ищет пользователей по имени
  postSearchUser(name: String) {
    const body = {'name' : name};
    return this.httpClient.post(this.url, body);
  }

  // Ищет пользователя по id (нужно, когда переходишь на страницу пользователя)
  postSearchUserById(id: String): Observable<User> {
    const body = {'id': id};
    return this.httpClient.post<User>(this.urlId, body);
  }

    // const promise = new Promise((resolve) => {
    //   this.httpClient.post(this.urlId, body).toPromise().then( (data: User) => {
    //     console.log(data);
    //     this.user = data;
    //     resolve();
    //   });
    // });

    // return promise;

}
