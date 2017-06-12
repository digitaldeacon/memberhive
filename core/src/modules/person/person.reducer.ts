import { createSelector } from 'reselect';
import * as actions from './person.actions';
import { Person } from './person.model';

export interface PersonState {
    loaded: boolean;
    loading: boolean;
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

        case actions.LIST_PEOPLE_SUCCESS: {
            const people: Person[] = action.payload;
            return {
                loaded: true,
                loading: false,
                ids: state.ids,
                people: people,
                personId: state.personId
            };
        }

        case actions.VIEW_PERSON: {
            return Object.assign({}, state, {
                loading: true,
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
            return {
                loaded: true,
                loading: false,
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
export const getLoaded: any = (state: PersonState) => state.loaded;
export const getLoading: any = (state: PersonState) => state.loading;
export const getPeople: any = (state: PersonState) => state.people;

export const getIds: any = (state: PersonState) => state.ids;
export const getSelectedId: any = (state: PersonState) => state.personId;
export const getPerson: any = createSelector(getPeople, getSelectedId, (people: any, selectedId: string) => {
    return people.filter((person: Person) => person.uid === selectedId)[0];
});

export const getAllPeople: any = createSelector(getPeople, getIds, (people: any, ids: string[]) => {
    return ids.map((id: string) => people.filter((person: Person) => person.uid === id));
});
