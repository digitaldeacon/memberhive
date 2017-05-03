import { Action } from '@ngrx/store';
import { Credentials } from './auth.model';
import { User } from '../person/person.model';

export const authActionTypes: any = {
    LOGIN: '[Auth] Login',
    LOGIN_SUCCESS: '[Auth] Login Success',
    LOGIN_FAILURE: '[Auth] Login Failure'
};

export class LoginAction implements Action {
    type: any = authActionTypes.LOGIN;
    constructor(public payload: Credentials) { }
}

export class LoginSuccessAction implements Action {
    type: any = authActionTypes.LOGIN_SUCCESS;
    constructor(public payload: User) { }
}

export class LoginFailureAction implements Action {
    type: any = authActionTypes.LOGIN_FAILURE;
    constructor(public payload: any) { }
}

export type AuthActions =
    LoginAction
    | LoginSuccessAction
    | LoginFailureAction;
