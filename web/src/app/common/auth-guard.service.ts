import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';

import {
    isAuthenticated,
    AppState
} from '../app.store';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private store: Store<AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let url: string = state.url;
        const isAuthentic$: any = this.store.select(isAuthenticated);
        isAuthentic$.subscribe((authenticated: any) => {
            if (!authenticated && !localStorage.getItem('mh.token')) {
                this.store.dispatch(go('/login'));
            }
        });
        // re-authenticate with the current token and load previous state again
        return localStorage.getItem('mh.token')
            ? Observable.of(true)
            : isAuthentic$;
    }
}
