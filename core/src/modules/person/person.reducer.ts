import { createSelector } from '@ngrx/store';
import * as actions from './person.actions';
import { Person } from './person.model';
import * as common from '../../common/common.model';

export interface PersonState {
    loaded: boolean;
    loading: boolean;
    message?: common.Message;
    ids: string[];
    people: Person[];
    personId: string;
}

const initialPersonState: PersonState = {
    loaded: false,
    loading: false,
    ids: [],
    people: [],
    personId: ''
};

export function personReducer(state: PersonState = initialPersonState,
    action: actions.PersonActions): PersonState {
    switch (action.type) {

        case actions.LIST_PEOPLE:
        case actions.UPDATE_PERSON:
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

        case actions.LOAD_PERSON_VIEW: {
            const person: Person = action.payload;
            if (state.ids.indexOf(person.uid) > -1) {
                return state;
            }
            return {
                loaded: false,
                loading: true,
                ids: [ ...state.ids, person.uid ],
                people: Object.assign({}, state.people, {
                    [person.id]: person
                }),
                personId: state.personId
            };
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
                ids: state.ids,
                people: state.people.map((p: Person) => {
                    return p.uid === person.uid ? Object.assign({}, p, person) : p;
                }),
                personId: person.uid
            };
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
export const getIds: any = (state: PersonState) => state.ids;
export const getSelectedId: any = (state: PersonState) => state.personId;
export const getPerson: any = createSelector(getPeople, getSelectedId, (people: any, selectedId: string) => {
    return people.filter((person: Person) => person.uid === selectedId)[0];
});

export const getAllPeople: any = createSelector(getPeople, getIds, (people: any, ids: string[]) => {
    return ids.map((id: string) => people.filter((person: Person) => person.uid === id));
});
