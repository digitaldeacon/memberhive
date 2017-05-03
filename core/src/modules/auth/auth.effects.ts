import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as actions from './auth.actions';
import { Credentials } from './auth.model';
import { HttpService } from '../../services/http.service';
import { User } from '../person/person.model';

@Injectable()
export class AuthEffects {

    /**
     * This effect makes use of the `startWith` operator to trigger
     * the effect immediately on startup.
     */
    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(actions.authActionTypes.LOGIN)
        .map((action: actions.LoginAction) => action.payload)
        .switchMap((credentials: Credentials) =>
            this.http.unauthenticatedPost('login/login',
                {
                    username: credentials.username,
                    password: credentials.password
                }
            )
            .map((r: User) => new actions.LoginSuccessAction(r))
        );

    constructor(private actions$: Actions,
                private http: HttpService) { }
}
