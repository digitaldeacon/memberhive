import { createSelector } from 'reselect';
import { PersonActions, personActionTypes } from './person.actions';
import { Person } from './person.model';

export interface PersonState {
    loaded: boolean;
    loading: boolean;
    people: Person[];
    personId: string;
};

const initialPersonState: PersonState = {
    loaded: false,
    loading: false,
    people: [],
    personId: ''
};

export function personReducer(state: PersonState = initialPersonState,
    action: PersonActions): PersonState {
    switch (action.type) {

        case personActionTypes.LIST:
            return Object.assign({}, state, {
                loading: true
            });

        case personActionTypes.LIST_SUCCESS: {
            return {
                loaded: true,
                loading: false,
                people: action.payload,
                personId: state.personId
            };
        }

        default: {
            return state;
        }
    }
}
export const getLoaded: any = (state: PersonState) => state.loaded;
export const getLoading: any = (state: PersonState) => state.loading;
export const getPeople: any = (state: PersonState) => state.people;
