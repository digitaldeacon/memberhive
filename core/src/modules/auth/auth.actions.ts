import { Action } from '@ngrx/store';
import { Credentials } from './auth.model';
import { Response } from '@angular/http';
import { User } from '../person/person.model';

export const authActionTypes: any = {
    AUTHENTICATE: '[User] Authenticate',
    AUTHENTICATE_FAILURE: '[User] Authentication failure',
    AUTHENTICATE_SUCCESS: '[User] Authentication success',
    AUTHENTICATED: '[User] Authenticated',
    AUTHENTICATED_FAILURE: '[User] Authenticated failure',
    AUTHENTICATED_SUCCESS: '[User] Authenticated success',
    REAUTHENTICATE: '[User] Re-Authenticate',
    REAUTHENTICATION_SUCCESS: '[User] Re-Authentication Success',
    SIGN_OUT: '[User] Sign off',
    SIGN_OUT_FAILURE: '[User] Sign off failure',
    SIGN_OUT_SUCCESS: '[User] Sign off success'
};

export class AuthenticateAction implements Action {
    type: any = authActionTypes.AUTHENTICATE;
    constructor(public payload: Credentials) { }
}

export class AuthenticationSuccessAction implements Action {
    type: any = authActionTypes.AUTHENTICATE_SUCCESS;
    constructor(public payload: User) { }
}

export class AuthenticationFailureAction implements Action {
    type: any = authActionTypes.AUTHENTICATE_FAILURE;
    constructor(public payload?: Response) { }
}

export class ReAuthenticateAction implements Action {
    type: any = authActionTypes.REAUTHENTICATE;
    constructor(public payload: string) { }
}

export class ReAuthenticationSuccessAction implements Action {
    type: any = authActionTypes.REAUTHENTICATION_SUCCESS;
    constructor(public payload: any) { }
}

/*
// We'll only need that in case we want to start a session in Yii
export class AuthenticatedAction implements Action {
    type: any = authActionTypes.AUTHENTICATED;
    constructor(public payload?: {token?: string}) { }
}

export class AuthenticatedSuccessAction implements Action {
    type: any = authActionTypes.AUTHENTICATED_SUCCESS;
    constructor(public payload: User) { }
}

export class AuthenticatedFailureAction implements Action {
    type: any = authActionTypes.AUTHENTICATED_FAILURE;
    constructor(public payload?: Response) { }
}*/

export class SignOutAction implements Action {
    public type: string = authActionTypes.SIGN_OUT;
    constructor(public payload?: any) {}
}

export class SignOutFailureAction implements Action {
    public type: string = authActionTypes.SIGN_OUT_FAILURE;
    constructor(public payload?: Response) {}
}

export class SignOutSuccessAction implements Action {
    public type: string = authActionTypes.SIGN_OUT_SUCCESS;
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
