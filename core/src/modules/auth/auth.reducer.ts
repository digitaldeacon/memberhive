import { createSelector } from 'reselect';
import { AuthActions, authActionTypes } from './auth.actions';
import { Person } from '../person/person.model';

export interface AuthState {
    token: string;
    personId: string;
    loading: boolean;
    loaded: boolean;
    error: string;
};

const initialAuthState: AuthState = {
    token: '',
    personId: '',
    loading: false,
    loaded: false,
    error: ''
};

export function authReducer(state: AuthState = initialAuthState,
                              action: AuthActions): AuthState {
    switch (action.type) {

        case authActionTypes.LOGIN:
            return Object.assign({}, state, {
                loading: true
            });

        case authActionTypes.LOGIN_SUCCESS: {
            const person: Person = action.payload;

            return {
                token: person.user.token,
                loaded: true,
                loading: false,
                personId: person.uid,
                error: ''
            };
        }

        case authActionTypes.LOGIN_FAILURE: {
            return {
                token: '',
                loaded: false,
                loading: false,
                personId: '',
                error: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
