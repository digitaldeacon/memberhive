import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import {
    isAuth,
    AppState
} from '../app.store';
import { ReAuthenticateAction, AuthService } from 'mh-core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _store: Store<AppState>,
                private _router: Router,
                private _authSrv: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const isAuthentic$: any = this._store.select(isAuth);

        isAuthentic$.subscribe((authenticated: any) => {
            console.log('auth', authenticated);
            console.log('exp', this._authSrv.isTokenExpired());
            if (!authenticated) {
                if (!this._authSrv.isTokenExpired()) {
                    this._store.dispatch(new ReAuthenticateAction(this._authSrv.token));
                }
                this._router.navigate(['/login']);
            }
        });

        return isAuthentic$;
    }
}
