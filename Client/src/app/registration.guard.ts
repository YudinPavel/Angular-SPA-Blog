// Нужно ли делать так!?

import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class RegistrationGuard implements CanActivate {

    constructor(private cookieService: CookieService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!!this.cookieService.get('recivedUser')) {
            this.router.navigate(['/app']);
        }

        return !this.cookieService.get('recivedUser');
    }
}
