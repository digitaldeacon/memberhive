import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as actions from './auth.actions';
import { Credentials } from './auth.model';
import { Person } from '../person/person.model';
import { HttpService } from '../../services/http.service';
import { LoginService } from '../../services/auth/login.service';

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
        .switchMap((data: any) => this.http.post('person/update?id=' + data.uid, data)
            .map((r: Person) => new actions.PersonUpdateSuccessAction(r))
        );


    constructor(private actions$: Actions,
                private _loginService: LoginService,
                private http: HttpService) { }
}
