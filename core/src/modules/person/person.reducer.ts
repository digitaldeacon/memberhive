import { createSelector } from '@ngrx/store';
import * as actions from './person.actions';
import { Person } from './person.model';
import * as common from '../../common/common.model';

export interface PersonState {
    loaded: boolean;
    loading: boolean;
    message?: common.Message;
    lastCreated?: string;
    people: Person[];
    personId: string;
}

const initialPersonState: PersonState = {
    loaded: false,
    loading: false,
    people: [],
    personId: ''
};

export function personReducer(state: PersonState = initialPersonState,
    action: actions.PersonActions): PersonState {
    switch (action.type) {

        case actions.LIST_PEOPLE:
        case actions.UPDATE_PERSON:
        case actions.CREATE_PERSON:
            return Object.assign({}, state, {
                loading: true
            });

        case actions.CLEAR_PERSON_MESSAGE:
            return Object.assign({}, state, {
                message: undefined
            });

        case actions.LIST_PEOPLE_SUCCESS: {
            const people: Person[] = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                people: people
            });
        }

        case actions.VIEW_PERSON: {
            return Object.assign({}, state, {
                personId: action.payload
            });
        }

        case actions.UPDATE_PERSON_SUCCESS: {
            const person: Person = action.payload;
            const message: common.Message = {
                type: common.MESSAGE_SUCCESS,
                text: 'Successfully updated ' + person.fullName
            };
            return {
                loaded: true,
                loading: false,
                message: message,
                people: state.people.map((p: Person) => {
                    return p.uid === person.uid ? Object.assign({}, p, person) : p;
                }),
                personId: person.uid
            };
        }

        case actions.UPDATE_PERSON_FAILURE: {
            const message: common.Message = {
                type: common.MESSAGE_FAILURE,
                text: action.payload
            };
            return Object.assign({}, state, {
                message: message
            });
        }

        case actions.CREATE_PERSON_SUCCESS: {
            const person: Person = action.payload;
            const message: common.Message = {
                type: common.MESSAGE_SUCCESS,
                text: 'Successfully created ' + person.fullName
            };
            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                message: message,
                lastCreated: person.uid,
                people: [...state.people, person]
            });
        }

        case actions.CREATE_PERSON_FAILURE: {
            const message: common.Message = {
                type: common.MESSAGE_FAILURE,
                text: action.payload
            };
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                message: message
            });
        }

        default: {
            return state;
        }
    }
}

export const getLoadedPerson: any = (state: PersonState) => state.loaded;
export const getLoadingPerson: any = (state: PersonState) => state.loading;
export const getMessagePerson: any = (state: PersonState) => state.message;

export const getPeople: any = (state: PersonState) => state.people;
export const getLastCreatedPersonId: any = (state: PersonState) => state.lastCreated;
export const getSelectedId: any = (state: PersonState) => state.personId;
export const getPerson: any = createSelector(getPeople, getSelectedId, (people: any, selectedId: string) => {
    return people.filter((person: Person) => person.uid === selectedId)[0];
});
