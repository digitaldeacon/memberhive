import { createSelector } from 'reselect';
import { PersonActions, personActionTypes } from './person.actions';
import { Person, emptyPerson } from './person.model';

export interface PersonState {
    person: Person;
    people:  { [id: string]: Person };
    selectedId: string;
};

const initialPersonState: PersonState = {
    person: emptyPerson,
    people: {},
    selectedId: ''
};

export function personReducer(state: PersonState = initialPersonState,
action: PersonActions): PersonState {
    switch (action.type) {

        case personActionTypes.GET:
            return {
                person: state.person,
                people: state.people,
                selectedId: action.payload
            };

        case personActionTypes.LIST:
            return state;

        case personActionTypes.CREATE:
            return initialPersonState;

        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: PersonState) => state.selectedId;
export const getPeople: any = (state: PersonState) => state.people;
export const getMe: any = (state: PersonState) => state.person;
export const getPerson = createSelector(getPeople, getSelectedId, (entities, selectedId) => {
    return entities[selectedId];
});