import { Action } from '@ngrx/store';
import { PersonActions, personActionTypes } from './person.actions';
import { initialPersonState, PersonState } from './person.state';

export function personReducer(state: PersonState = initialPersonState,
action: PersonActions): PersonState {
    switch (action.type) {

        case personActionTypes.GET:
            return state;

        case personActionTypes.LIST:
            return state;

        case personActionTypes.CREATE:
            return initialPersonState;

        default: {
            return state;
        }
    }
}
