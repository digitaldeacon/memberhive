import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DialogService } from '../common/dialog.service';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { isAuth, AppState, ReAuthenticateAction, AuthService } from '@memberhivex/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _store: Store<AppState>,
    private _router: Router,
    private _authSrv: AuthService,
    private _dialogSrv: DialogService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const isAuthentic$: any = this._store.select(isAuth);
    let isExpired: boolean = true;

    isAuthentic$.subscribe((authenticated: boolean) => {
      // we must call this here because the token exp date won't be instantiated at isExpired declaration time
      isExpired = this._authSrv.isTokenExpired();
      if (authenticated && isExpired) {
        this._dialogSrv.login('Your session expired').subscribe((confirmed: any) => {
          // console.log(confirmed);
        });
      } else if (!authenticated) {
        this._router.navigate(['/login']);
      }
    });

    return isAuthentic$;
  }
}
