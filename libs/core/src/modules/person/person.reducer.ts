import { HttpErrorResponse } from '@angular/common/http';
import { createSelector } from '@ngrx/store';
import * as actions from './person.actions';
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

export function personReducer(state: PersonState = initialPersonState, action: actions.PersonActions): PersonState {
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
      const payload: Person[] = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        people: payload
      });
    }

    case actions.VIEW_PERSON: {
      return Object.assign({}, state, {
        personId: action.payload
      });
    }

    case actions.UPDATE_PERSON_SUCCESS: {
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

    case actions.DELETE_PERSON_SUCCESS: {
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

    case actions.CALC_PERSON_GEO_FAILURE:
    case actions.LIST_PEOPLE_FAILURE:
    case actions.CREATE_PERSON_FAILURE:
    case actions.DELETE_PERSON_FAILURE: {
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

    case actions.CREATE_PERSON_SUCCESS: {
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

    /**
     * @deprecated
     */
    case actions.CALC_PERSON_GEO_SUCCESS: {
      const payload: CalcGeoCodePayload = action.payload;
      const message: common.Message = {
        type: common.MessageType.SUCCESS,
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
export const person: any = createSelector(people, selectedId, (ppl: any, uid: string) => {
  return ppl.filter((p: Person) => p.uid === uid)[0];
});
