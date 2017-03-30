import { Action } from '@ngrx/platform/modules/store';
import { PersonActions, PersonActionTypes } from './person.actions';
import { initialPersonState, PersonState } from './person.state';

export function personReducer(state = initialPersonState, action: PersonActions): PersonState {
    switch (action.type) {

        case PersonActionTypes.GET:
            return state;

        case PersonActionTypes.LIST:
            return state;

        case PersonActionTypes.CREATE:
            return initialPersonState;

        default: {
            return state;
        }
    }
}