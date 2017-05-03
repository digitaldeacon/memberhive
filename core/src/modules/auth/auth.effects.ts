import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as actions from './auth.actions';
import { Credentials, LoginResponse } from './auth.model';
import { HttpService } from '../../services/http.service';
import { User } from '../person/person.model';

@Injectable()
export class AuthEffects {

    /**
     * This effect makes use of the `startWith` operator to trigger
     * the effect immediately on startup.
     */
    @Effect()
    login$: Observable<Action> = this._actions$
        .ofType(actions.authActionTypes.LOGIN)
        .map((action: actions.LoginAction) => action.payload)
        .switchMap((credentials: Credentials) =>
            this._http.unauthenticatedPost('login/login',
                {
                    username: credentials.username,
                    password: credentials.password
                }
            )
            .map((r: LoginResponse) => {
                return new actions.LoginSuccessAction(r.user);
            })
            .catch((response: Response) => {
                return Observable.of(new actions.LoginFailureAction(response));
            })
        );

    constructor(private _actions$: Actions,
                private _http: HttpService) { }
}
