import { createSelector } from 'reselect';
import { PeopleActions, peopleActionTypes } from './people.actions';
import { Person, emptyPerson } from '../person/person.model';

export interface PeopleState {
    loaded: boolean;
    loading: boolean;
    people: Person[]
};

const initialPersonState: PeopleState = {
    loaded: false,
    loading: false,
    people: []
};

export function peopleReducer(state: PeopleState = initialPersonState,
    action: PeopleActions): PeopleState {
    switch (action.type) {

        case peopleActionTypes.LIST:
            return Object.assign({}, state, {
                loading: true
            });

        case peopleActionTypes.LIST_SUCCESS: {
            return {
                loaded: true,
                loading: false,
                people: action.payload
            };
        }

        default: {
            return state;
        }
    }
}
export const getLoaded = (state: PeopleState) => state.loaded;
export const getLoading = (state: PeopleState) => state.loading;
export const getPeople = (state: PeopleState) => state.people;