import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): Observable<boolean> {
        return this.loginService.isLoggedIn().map((e: boolean) => {
            return e;
        }).catch(() => {
            this.loginService.redirectUrl = url;
            this.router.navigate(['/login']);
            return Observable.of(false);
        });

    }
}
