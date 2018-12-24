import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { RegistrationService } from '../services/registration.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from '../models/Message';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();

  message: Message;

  confirmPassword: String;

  // done: Object;

  constructor(public registrationService: RegistrationService, public router: Router) { }

  registrateNewUser(user: User) {
    // Изменить потом на нормальную валидацию пароля и подтверждения пароля
    // Добавить очистку полей, если успешно (либо переход на новую страницу)
    if (this.user.password.length < 5 || +this.user.password === +this.user.password) {
      this.message = {message: 'Password must contain at least 8 characters and at least 1 character'};
    } else if (this.confirmPassword === this.user.password) {
      return this.registrationService.postRegistration(user).subscribe((data: Message) => {
      this.message = data;
      if (data.message === 'you have successfully registered!') {
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
        }
      });
    } else {
      this.message = {message: 'invalid password confirmation entered'};
    }
  }

  onSubmit(registrationForm: NgForm) {
    console.log(registrationForm);
  }

  // УДАЛИТЬ ПОТОМ!!!
  onSurnameChange() {
  }

  ngOnInit() {
    this.user.gender = false;
  }

}








// registrationForm: FormGroup = new FormGroup({
//   'name': new FormControl('', Validators.required),
//   'surname': new FormControl('', Validators.required),
//   'email': new FormControl('', [Validators.required, Validators.email]),
//   'password': new FormControl('', [Validators.required, this.passwordValidation]),
//   'confirm-password': new FormControl('', [Validators.required]), // this.confirmPasswordValidation
// });

// passwordValidation(control: FormControl): {[s: string]: boolean} {
//   if (1) { // +control.value == control.value
//     return {'name': true};
//   }
//   return null;
// }

// // confirmPasswordValidation(control: FormControl): {[s: string]: boolean} {
// //   if (this.confirmPassword === this.user.password) {
// //     return {'confirm-password': true};
// //   }
// //   return null;
// // }
