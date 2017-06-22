import * as actions from './auth.actions';

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
    status: 200
};

export function authReducer(state: AuthState = initialAuthState,
                              action: actions.AuthActions): AuthState {
    switch (action.type) {

        case actions.AUTHENTICATE:
            return Object.assign({}, state, {
                loading: true
            });

        case actions.AUTHENTICATE_SUCCESS: {
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

        case actions.AUTHENTICATE_FAILURE: {
            const res = action.payload;
            const resPromise: any = (res.status !== 504) ? res.json() : undefined;
            const error: string = resPromise ? resPromise.message : res.statusText;

            return {
                authenticated: false,
                loaded: false,
                loading: false,
                personId: '',
                error: error,
                status: res.status
            };
        }

        case actions.SIGN_OUT_FAILURE:
            return Object.assign({}, state, {
                authenticated: true,
                loaded: true,
                loading: false,
                error: action.payload,
                personId: state.personId
            });

        case actions.SIGN_OUT_SUCCESS:
            return Object.assign({}, state, initialAuthState);

        case actions.REAUTHENTICATE:
            return Object.assign({}, state, {
                loading: true,
                token: action.payload
            });

        case actions.REAUTHENTICATION_SUCCESS:
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
