import { HttpErrorResponse } from '@angular/common/http';
import { createSelector } from '@ngrx/store';
import { PeopleActionTypes, PeopleActions } from './person.actions';
import { Person, CalcGeoCodePayload } from './person.model';
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

export function personReducer(state: PersonState = initialPersonState, action: PeopleActions): PersonState {
  switch (action.type) {
    case PeopleActionTypes.LIST_PEOPLE:
    case PeopleActionTypes.UPDATE_PERSON:
    case PeopleActionTypes.CREATE_PERSON:
    case PeopleActionTypes.DELETE_PERSON:
    case PeopleActionTypes.UPLOAD_PERSON_AVATAR:
      return Object.assign({}, state, {
        loading: true
      });

    case PeopleActionTypes.CLEAR_PERSON_MESSAGE:
      return Object.assign({}, state, {
        message: undefined
      });

    case PeopleActionTypes.LIST_PEOPLE_SUCCESS: {
      const payload: Person[] = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        people: payload
      });
    }

    case PeopleActionTypes.VIEW_PERSON: {
      return Object.assign({}, state, {
          personId: action.payload,
          lastCreated: ''
      });
    }

    case PeopleActionTypes.UPDATE_PERSON_SUCCESS: {
      const payload: Person = action.payload;
      const message: common.Message = {
        type: common.MessageType.SUCCESS,
        text: 'Successfully updated ' + payload.fullName
      };
      return {
        loaded: true,
        loading: false,
        message: message,
        people: state.people.map((p: Person) => {
          return p.uid === payload.uid ? Object.assign({}, p, payload) : p;
        }),
        personId: state.personId
      };
    }

    case PeopleActionTypes.DELETE_PERSON_SUCCESS: {
      const payload: Person = action.payload;
      const message: common.Message = {
        type: common.MessageType.SUCCESS,
        text: 'Successfully deleted this person'
      };
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        message: message,
        people: state.people.filter((p: Person) => p.id !== payload.id)
      });
    }

    case PeopleActionTypes.CALC_PERSON_GEO_FAILURE:
    case PeopleActionTypes.LIST_PEOPLE_FAILURE:
    case PeopleActionTypes.CREATE_PERSON_FAILURE:
    case PeopleActionTypes.DELETE_PERSON_FAILURE:
    case PeopleActionTypes.UPDATE_PERSON_FAILURE: {
      const res: HttpErrorResponse = action.payload;
      const message: common.Message = {
        type: common.MessageType.FAILURE,
        text: res.message
      };
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        message: message
      });
    }

    case PeopleActionTypes.CREATE_PERSON_SUCCESS: {
      const payload: Person = action.payload;
      const message: common.Message = {
        type: common.MessageType.SUCCESS,
        text: 'Successfully created ' + payload.fullName
      };
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        message: message,
        lastCreated: payload.uid,
        people: [...state.people, payload]
      });
    }

    case PeopleActionTypes.CALC_PERSON_GEO_SUCCESS: {
      const payload: CalcGeoCodePayload = action.payload;
      return {
        ...state,
        people: state.people.map((p: Person) => {
          if (p.uid === payload.person.uid) {
            p.address = payload.person.address;
            return p;
          }
          return p;
        })
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
export const person: any = createSelector(people, selectedId, (ppl: any, uid: string) => {
  return ppl.filter((p: Person) => p.uid === uid)[0];
});
