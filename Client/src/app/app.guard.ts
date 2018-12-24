import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SignInService } from './services/sign-in.service';
import { Injectable } from '@angular/core';

import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class AppGuard implements CanActivate {

    constructor(private cookieService: CookieService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return !!this.cookieService.get('recivedUser');
    }
}
