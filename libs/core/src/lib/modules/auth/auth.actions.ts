import { Action } from '@ngrx/store';
import { Credentials } from './auth.model';
import { User } from '../person/person.model';
import { HttpErrorResponse } from '@angular/common/http';

export enum AuthActionTypes {
  AUTHENTICATE = '[User] Authenticate',
  AUTHENTICATE_FAILURE = '[User] Authentication failure',
  AUTHENTICATE_SUCCESS = '[User] Authentication success',
  AUTHENTICATED = '[User] Authenticated',
  AUTHENTICATED_FAILURE = '[User] Authenticated failure',
  AUTHENTICATED_SUCCESS = '[User] Authenticated success',
  REAUTHENTICATE = '[User] Re-Authenticate',
  REAUTHENTICATION_SUCCESS = '[User] Re-Authentication Success',
  SIGN_OUT = '[User] Sign off',
  SIGN_OUT_FAILURE = '[User] Sign off failure',
  SIGN_OUT_SUCCESS = '[User] Sign off success'
}

export class AuthenticateAction implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE;
  constructor(public payload: Credentials) {}
}

export class AuthenticationSuccessAction implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_SUCCESS;
  constructor(public payload: User) {}
}

export class AuthenticationFailureAction implements Action {
  readonly type = AuthActionTypes.AUTHENTICATE_FAILURE;
  constructor(public payload?: HttpErrorResponse | string) {}
}

export class ReAuthenticateAction implements Action {
  readonly type = AuthActionTypes.REAUTHENTICATE;
  constructor(public payload: string) {}
}

export class ReAuthenticationSuccessAction implements Action {
  readonly type = AuthActionTypes.REAUTHENTICATION_SUCCESS;
  constructor(public payload: any) {}
}

export class SignOutAction implements Action {
  readonly type = AuthActionTypes.SIGN_OUT;
}

export class SignOutFailureAction implements Action {
  readonly type = AuthActionTypes.SIGN_OUT_FAILURE;
  constructor(public payload?: HttpErrorResponse) {}
}

export class SignOutSuccessAction implements Action {
  readonly type = AuthActionTypes.SIGN_OUT_SUCCESS;
  constructor(public payload?: any) {}
}

export type AuthActions =
  | AuthenticateAction
  | AuthenticationSuccessAction
  | AuthenticationFailureAction
  | SignOutAction
  | SignOutFailureAction
  | SignOutSuccessAction
  | ReAuthenticateAction
  | ReAuthenticationSuccessAction;
