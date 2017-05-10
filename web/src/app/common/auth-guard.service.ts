import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Observable } from 'rxjs';
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
            if (!authenticated) {
                this.store.dispatch(go('/login'));
            }
        });

        return isAuthentic$;
    }
}
