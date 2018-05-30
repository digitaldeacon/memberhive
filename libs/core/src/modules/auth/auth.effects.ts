import { catchError, map, tap, switchMap, exhaustMap } from 'rxjs/operators';
import { of ,  Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { DataPersistence } from '@nrwl/nx';

import {
  AuthActionTypes,
  AuthenticateAction,
  AuthenticationFailureAction,
  AuthenticationSuccessAction,
  ReAuthenticateAction,
  ReAuthenticationSuccessAction,
  SignOutSuccessAction
} from './auth.actions';
import { Credentials } from './auth.model';
import { User } from '../person/person.model';
import { AuthService } from './auth.service';
import { AppState } from '../../store';

@Injectable()
export class AuthEffects {
  @Effect()
  public login$: Observable<Action> = this._actions$.pipe(
    ofType<AuthenticateAction>(AuthActionTypes.AUTHENTICATE),
    map((action: AuthenticateAction) => action.payload),
    switchMap((credentials: Credentials) =>
      this._http
        .post<User>('/api/login/login', {
          username: credentials.username,
          password: credentials.password
        })
        .pipe(
          map((r: any) => {
            if (typeof r === 'string') {
              return new AuthenticationFailureAction(r);
            }
            this._authSrv.token = r.user.token;
            this._authSrv.personId = r.user.personId;
            this._authSrv.createdAt = new Date();
            return new AuthenticationSuccessAction(r.user);
          }),
          catchError((response: HttpErrorResponse) => of(new AuthenticationFailureAction(response)))
        )
    )
  );

  @Effect()
  public $reauth: Observable<Action> = this._actions$.pipe(
    ofType<ReAuthenticateAction>(AuthActionTypes.REAUTHENTICATE),
    map((action: ReAuthenticateAction) => action.payload),
    exhaustMap((token: string) => {
      return this._http.get('api/login/alive').pipe(
        map(
          (r: any) =>
            new ReAuthenticationSuccessAction({
              token: this._authSrv.token,
              personId: this._authSrv.personId
            })
        ),
        tap(() => this._router.navigate(['/dashboard'])),
        catchError((response: HttpErrorResponse) => of(new AuthenticationFailureAction(response))),
        tap(() => this._router.navigate(['/login']))
      );
    })
  );

  @Effect()
  public signOut: Observable<Action> = this._actions$.pipe(
    ofType<SignOutSuccessAction>(AuthActionTypes.SIGN_OUT),
    map(value => new SignOutSuccessAction()),
    tap((v: any) => {
      this._router.navigate(['/login']);
    })
  );

  constructor(
    private _s: DataPersistence<AppState>,
    private _actions$: Actions,
    private _router: Router,
    private _http: HttpClient,
    private _authSrv: AuthService
  ) {}
}
