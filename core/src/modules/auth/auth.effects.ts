import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/take';
import { defer } from 'rxjs/observable/defer';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { ROUTER_ERROR, ROUTER_CANCEL } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';

import * as actions from './auth.actions';
import { Credentials, LoginResponse } from './auth.model';
import { HttpService } from '../../services/http.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {

    @Effect()
    public login$: Observable<Action> = this._actions$
        .ofType(actions.AUTHENTICATE)
        .map((action: actions.AuthenticateAction) => action.payload)
        .switchMap((credentials: Credentials) =>
            this._http.unauthenticatedPost('login/login',
                {
                    username: credentials.username,
                    password: credentials.password
                }
            )
            .map((r: any) => {
                // this._db.insert('auth', [r.user.token, r.user.personId]);
                if (typeof r === 'string') {
                    return new actions.AuthenticationFailureAction(r);
                }
                this._authSrv.token = r.user.token;
                this._authSrv.personId = r.user.personId;
                this._authSrv.createdAt = new Date();
                return new actions.AuthenticationSuccessAction(r.user);
            })
            .catch((response: HttpErrorResponse) => {
                return Observable.of(new actions.AuthenticationFailureAction(response));
            })
        );

    @Effect()
    public $reauth: Observable<Action> = this._actions$
        .ofType(actions.REAUTHENTICATE)
        .map((action: actions.ReAuthenticateAction) => action.payload)
        .exhaustMap((token: string) => {
            return this._http.get('login/alive')
                .map((r: any) => {
                    return new actions.ReAuthenticationSuccessAction({
                        token: this._authSrv.token,
                        personId: this._authSrv.personId
                    });
                })
                .catch((response: HttpErrorResponse) => {
                    return Observable.of(new actions.AuthenticationFailureAction(response));
                });
            }
        );

    @Effect()
    public signOut: Observable<Action> = this._actions$
        .ofType(actions.SIGN_OUT)
        .map(value => new actions.SignOutSuccessAction());

    constructor(private _actions$: Actions,
                private _http: HttpService,
                private _authSrv: AuthService) { }
}
