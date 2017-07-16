import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { defer } from 'rxjs/observable/defer';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
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
        .map(toPayload)
        .switchMap((credentials: Credentials) =>
            this._http.unauthenticatedPost('login/login',
                {
                    username: credentials.username,
                    password: credentials.password
                }
            )
            .map((r: LoginResponse) => {
                // this._db.insert('auth', [r.user.token, r.user.personId]);
                this._authSrv.setToken(r.user.token);
                this._authSrv.setPersonId(r.user.personId);
                this._authSrv.setCreatedAt(new Date());
                return new actions.AuthenticationSuccessAction(r.user);
            })
            .catch((response: Response) => {
                return Observable.of(new actions.AuthenticationFailureAction(response));
            })
        );

    @Effect()
    public $reauth: Observable<Action> = this._actions$
        .ofType(actions.REAUTHENTICATE)
        .map(toPayload)
        .switchMap((token: string) =>
            this._http.get('site/test-login')
                .map((r: any) => {
                    return new actions.ReAuthenticationSuccessAction({
                        token: this._authSrv.getToken(),
                        personId: this._authSrv.getPersonId()
                    });
                })
                .catch((response: Response) => {
                    return Observable.of(new actions.AuthenticationFailureAction(response));
                })
        );

    @Effect()
    public signOut: Observable<Action> = this._actions$
        .ofType(actions.SIGN_OUT)
        .map(value => new actions.SignOutSuccessAction());

    @Effect() routeError$: Observable<Action> = this._actions$.ofType(ROUTER_ERROR)
        .map(toPayload)
        .do(payload => console.log('router cancelled: ', payload));

    @Effect() routeCancelled$: Observable<Action> = this._actions$.ofType(ROUTER_CANCEL)
        .map(toPayload)
        .do(payload => console.log('router cancelled: ', payload));


    constructor(private _actions$: Actions,
                private _http: HttpService,
                private _authSrv: AuthService) { }
}
