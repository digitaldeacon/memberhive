import { AuthActions, authActionTypes } from './auth.actions';
import { AuthService } from './auth.service';
import { LocalStorageService } from 'ng2-webstorage';

export interface AuthState {
    authenticated: boolean;
    token?: string;
    personId: string;
    loading: boolean;
    loaded: boolean;
    error?: string; // Promise<string>;
    status: number;
}

const initialAuthState: AuthState = {
    authenticated: false,
    personId: '',
    loading: false,
    loaded: false,
    status: 200
};

export function authReducer(state: AuthState = initialAuthState,
                              action: AuthActions): AuthState {
    switch (action.type) {

        case authActionTypes.AUTHENTICATE:
            return Object.assign({}, state, {
                loading: true
            });

        case authActionTypes.AUTHENTICATE_SUCCESS: {
            const user: any = action.payload;

            return {
                authenticated: (user && user.token !== undefined),
                token: user ? user.token : '',
                personId: user ? user.personId : '',
                loaded: true,
                loading: false,
                status: 200
            };
        }

        case authActionTypes.AUTHENTICATE_FAILURE: {
            const res: Response = action.payload;
            // const msg: any = res.json();
            return {
                authenticated: false,
                loaded: false,
                loading: false,
                personId: '',
                error: res.statusText,
                status: res.status
            };
        }

        case authActionTypes.SIGN_OUT_FAILURE:
            return Object.assign({}, state, {
                authenticated: true,
                loaded: true,
                loading: false,
                error: action.payload,
                personId: state.personId
            });

        case authActionTypes.SIGN_OUT_SUCCESS:
            return Object.assign({}, state, {
                authenticated: false,
                loaded: true,
                loading: false,
                error: undefined,
                personId: ''
            });

        case authActionTypes.REAUTHENTICATE:
            return Object.assign({}, state, {
                loading: true,
                token: action.payload
            });

        case authActionTypes.REAUTHENTICATION_SUCCESS:
            return Object.assign({}, state, {
                authenticated: true,
                token: action.payload.token,
                personId: action.payload.personId,
                loaded: true,
                loading: false,
                status: 200
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
