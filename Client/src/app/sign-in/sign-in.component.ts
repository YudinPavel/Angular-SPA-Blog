import { Component, OnInit } from '@angular/core';
import { SignInService } from '../services/sign-in.service';
import { User } from '../models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {

  public user: User = new User();

  constructor(public signInService: SignInService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }

  sumbit(user: User) {
    this.signInService.postData(user);
  }

  // // GET - запрос
  // enterEmail() {
  //   return this.signInService.getData().subscribe((response) => {
  //     this.response = response;
  //     console.log(this.response);
  //   });
  // }

}
