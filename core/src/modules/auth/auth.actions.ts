import { Action } from '@ngrx/store';
import { Credentials } from './auth.model';
import { Response } from '@angular/http';
import { User } from '../person/person.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

export const AUTHENTICATE = '[User] Authenticate';
export const AUTHENTICATE_FAILURE = '[User] Authentication failure';
export const AUTHENTICATE_SUCCESS = '[User] Authentication success';
export const AUTHENTICATED = '[User] Authenticated';
export const AUTHENTICATED_FAILURE = '[User] Authenticated failure';
export const AUTHENTICATED_SUCCESS = '[User] Authenticated success';
export const REAUTHENTICATE = '[User] Re-Authenticate';
export const REAUTHENTICATION_SUCCESS = '[User] Re-Authentication Success';
export const SIGN_OUT = '[User] Sign off';
export const SIGN_OUT_FAILURE = '[User] Sign off failure';
export const SIGN_OUT_SUCCESS = '[User] Sign off success';

export class AuthenticateAction implements Action {
    readonly type = AUTHENTICATE;
    constructor(public payload: Credentials) { }
}

export class AuthenticationSuccessAction implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: User) { }
}

export class AuthenticationFailureAction implements Action {
    readonly type = AUTHENTICATE_FAILURE;
    constructor(public payload?: HttpErrorResponse|string) { }
}

export class ReAuthenticateAction implements Action {
    readonly type = REAUTHENTICATE;
    constructor(public payload: string) { }
}

export class ReAuthenticationSuccessAction implements Action {
    readonly type = REAUTHENTICATION_SUCCESS;
    constructor(public payload: any) { }
}

/*
// We'll only need that in case we want to start a session in Yii
export class AuthenticatedAction implements Action {
 readonly type = authActionTypes.AUTHENTICATED;
    constructor(public payload?: {token?: string}) { }
}

export class AuthenticatedSuccessAction implements Action {
 readonly type = authActionTypes.AUTHENTICATED_SUCCESS;
    constructor(public payload: User) { }
}

export class AuthenticatedFailureAction implements Action {
 readonly type = authActionTypes.AUTHENTICATED_FAILURE;
    constructor(public payload?: Response) { }
}*/

export class SignOutAction implements Action {
    readonly type = SIGN_OUT;
}

export class SignOutFailureAction implements Action {
    readonly type = SIGN_OUT_FAILURE;
    constructor(public payload?: HttpErrorResponse) {}
}

export class SignOutSuccessAction implements Action {
    readonly type = SIGN_OUT_SUCCESS;
    constructor(public payload?: any) {}
}

export type AuthActions =
    AuthenticateAction
    | AuthenticationSuccessAction
    | AuthenticationFailureAction
    | SignOutAction
    | SignOutFailureAction
    | SignOutSuccessAction
    | ReAuthenticateAction
    | ReAuthenticationSuccessAction;
