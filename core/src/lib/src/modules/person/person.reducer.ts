import { HttpErrorResponse } from '@angular/common/http';
import { createSelector } from '@ngrx/store';
import * as actions from './person.actions';
import { Person, CalcGeoCodePayload } from './person.model';
import * as common from '../../common/common.model';
import { Utils } from '../../common/common.utils';

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
        case actions.DELETE_PERSON:
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

        case actions.UPDATE_PERSON_FAMILY_SUCCESS: {
            // TODO: design this better so we don't need this replicated method
            // from 'UPDATE_PERSON_SUCCESS'
            // the reason why we need it is because of personId,
            // where we update a different person than selected
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
                personId: state.personId
            };
        }

        case actions.DELETE_PERSON_SUCCESS: {
            const person: Person = action.payload;
            const message: common.Message = {
                type: common.MESSAGE_SUCCESS,
                text: 'Successfully deleted this person'
            };
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                message: message,
                people: state.people.filter((p: Person) => p.id !== person.id)
            });
        }

        case actions.CALC_PERSON_GEO_FAILURE:
        case actions.LIST_PEOPLE_FAILURE:
        case actions.CREATE_PERSON_FAILURE:
        case actions.UPDATE_PERSON_FAILURE:
        case actions.UPDATE_PERSON_FAMILY_FAILURE:
        case actions.DELETE_PERSON_FAILURE: {
            const res: HttpErrorResponse = action.payload;
            const message: common.Message = {
                type: common.MESSAGE_FAILURE,
                text: res.message
            };
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
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

        /**
         * @deprecated
         */
        case actions.CALC_PERSON_GEO_SUCCESS: {
            const payload: CalcGeoCodePayload = action.payload;
            const message: common.Message = {
                type: common.MESSAGE_SUCCESS,
                text: 'Successfully updated geocodes for ' + payload.person.fullName
            };
            return {
                loading: false,
                loaded: true,
                message: message,
                people: state.people.map((p: Person) => {
                    return p.uid === payload.person.uid ? Object.assign({}, p, payload.person) : p;
                }),
                personId: payload.person.uid
            };
        }

        default: {
            return state;
        }
    }
}

export const loadedPerson: any = (state: PersonState) => state.loaded;
export const loadingPerson: any = (state: PersonState) => state.loading;
export const messagePerson: any = (state: PersonState) => state.message;

export const people: any = (state: PersonState) => state.people;
export const lastCreatedPersonId: any = (state: PersonState) => state.lastCreated;
export const selectedId: any = (state: PersonState) => state.personId;
export const person: any = createSelector(people, selectedId, (people: any, uid: string) => {
    return people.filter((person: Person) => person.uid === uid)[0];
});
