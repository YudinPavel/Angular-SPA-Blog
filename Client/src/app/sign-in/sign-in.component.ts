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

  message: string;

  constructor(public signInService: SignInService,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit() {
  }

  sumbit(user: User): void {
    this.signInService.postData(user).subscribe((data: User) => {
      this.cookieService.put('recivedUser', data.email);
      this.cookieService.put('id', data._id);
      this.cookieService.put('root', data.rights);
      if (data.email) {
        this.router.navigate(['/app']);
      } else {
        this.message = 'Incorrect email or password!';
      }
    });
  }

}
