import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  recivedUser: User;

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) {
  }

  url = 'http://localhost:3000/signin';


  // Вход (записывает в кукис емайл, айдишник и права. В будущем возможно что-то еще придется записать)
  postData(user: User): Observable<Object> {
    const body = user;

    return this.httpClient.post(this.url, body);

    // const promise = new Promise((resolve, reject) => {
    //   this.httpClient.post(this.url, body).toPromise().then( (data: User) => {
    //     this.cookieService.put('recivedUser', data.email);
    //     this.cookieService.put('id', data._id);
    //     this.cookieService.put('root', data.rights);
    //     if (data.email) {
    //       this.router.navigate(['/app']);
    //     }
    //     resolve();
    //   });
    // });

    // return promise;

    // return this.httpClient.post(this.url, body).subscribe((data: User) => {
    //   this.cookieService.put('recivedUser', data.email);
    //   this.cookieService.put('id', data._id);

    //   this.recivedUser = data;

    //   if (data.email) {
    //     this.router.navigate(['/app']);
    //   }
    // });

  }
}
