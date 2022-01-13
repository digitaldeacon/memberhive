import { AuthActionTypes, AuthActions } from './auth.actions';
import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState {
  authenticated: boolean;
  token?: string;
  personId: string;
  loading: boolean;
  loaded: boolean;
  error?: string;
  status: number;
}

const initialAuthState: AuthState = {
  authenticated: false,
  personId: '',
  loading: false,
  loaded: false,
  status: 200,
};

export function authReducer(state: AuthState = initialAuthState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.AUTHENTICATE:
      return Object.assign({}, state, {
        loading: true,
      });

    case AuthActionTypes.AUTHENTICATE_SUCCESS: {
      const user: any = action.payload;

      return {
        authenticated: user && user.token !== undefined,
        token: user ? user.token : '',
        personId: user ? user.personId : '',
        loaded: true,
        loading: false,
        status: 200,
      };
    }

    case AuthActionTypes.AUTHENTICATE_FAILURE: {
      const res: any = action.payload;
      const rawStatus: number[] = [504, 404];
      let error: string = typeof res === 'string' ? res : '';
      let status: number = 403;
      if (res instanceof HttpErrorResponse && rawStatus.indexOf(res.status) === -1) {
        error = res.message;
        status = res.status;
      }

      return {
        authenticated: false,
        loaded: false,
        loading: false,
        personId: '',
        error: error,
        status: status,
      };
    }

    case AuthActionTypes.SIGN_OUT_FAILURE:
      return Object.assign({}, state, {
        authenticated: true,
        loaded: true,
        loading: false,
        error: action.payload,
        personId: state.personId,
      });

    case AuthActionTypes.SIGN_OUT_SUCCESS: {
      return Object.assign({}, state, initialAuthState);
    }

    case AuthActionTypes.REAUTHENTICATE:
      return Object.assign({}, state, {
        loading: true,
        token: action.payload,
      });

    case AuthActionTypes.REAUTHENTICATION_SUCCESS:
      return Object.assign({}, state, {
        authenticated: true,
        token: action.payload.token,
        personId: action.payload.personId,
        loaded: true,
        loading: false,
        status: 200,
      });

    default: {
      return state;
    }
  }
}

export const isAuthenticated: any = (state: AuthState) => state.authenticated;
export const isAuthenticatedLoaded: any = (state: AuthState) => state.loaded;
export const isAuthenticationLoading: any = (state: AuthState) => state.loading;
export const getToken: any = (state: AuthState) => state.token;
export const getPersonId: any = (state: AuthState) => state.personId;
export const getAuthenticationError: any = (state: AuthState) => state.error;
export const getStatus: any = (state: AuthState) => state.status;
