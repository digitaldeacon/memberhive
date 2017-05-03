import { createSelector } from 'reselect';
import { AuthActions, authActionTypes } from './auth.actions';
import { getPeople } from '../person/person.reducer';
import { Person } from '../person/person.model';

export interface AuthState {
    token: string;
    personId: string;
    loading: boolean;
    loaded: boolean;
    error: string;
    status: number;
};

const initialAuthState: AuthState = {
    token: '',
    personId: '',
    loading: false,
    loaded: false,
    error: '',
    status: 200
};

export function authReducer(state: AuthState = initialAuthState,
                              action: AuthActions): AuthState {
    switch (action.type) {

        case authActionTypes.LOGIN:
            return Object.assign({}, state, {
                loading: true
            });

        case authActionTypes.LOGIN_SUCCESS: {
            const user: any = action.payload;

            return {
                token: user.token,
                personId: user.personId,
                loaded: true,
                loading: false,
                error: '',
                status: 200
            };
        }

        case authActionTypes.LOGIN_FAILURE: {
            const res: any = action.payload;
            return {
                token: '',
                loaded: false,
                loading: false,
                personId: '',
                error: res.statusText,
                status: res.status
            };
        }

        default: {
            return state;
        }
    }
}

export const getToken: any = (state: AuthState) => state.token;
export const getLoadingAuth: any = (state: AuthState) => state.loading;
export const getPersonId: any = (state: AuthState) => state.personId;
export const getErrorText: any = (state: AuthState) => state.error;
export const getStatus: any = (state: AuthState) => state.status;

export const getAllAuth: any = createSelector(getToken, getPersonId, getStatus, getErrorText);
