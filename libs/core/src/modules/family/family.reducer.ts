import { HttpErrorResponse } from '@angular/common/http';
import { Family } from './family.model';
import { FamilyActionTypes, FamilyActions } from './family.actions';
import { Message, MessageType } from '../../common/common.model';

export interface FamilyState {
  loaded?: boolean;
  loading?: boolean;
  message?: Message;
  families: Family[];
}

const initialState: FamilyState = {
  families: []
};

export function familyReducer(state: FamilyState = initialState, action: FamilyActions): FamilyState {
  switch (action.type) {
    case FamilyActionTypes.UPDATE_FAMILY:
    case FamilyActionTypes.REMOVE_MEMBER:
    case FamilyActionTypes.LINK_PERSON_FAMILY:
    case FamilyActionTypes.ACCEPT_MEMBER:
    case FamilyActionTypes.IGNORE_MEMBER:
    case FamilyActionTypes.ADD_FAMILY:
    case FamilyActionTypes.LIST_FAMILIES:
      return Object.assign({}, state, {
        loading: true
      });

    case FamilyActionTypes.UPDATE_FAMILY_FAILURE:
    case FamilyActionTypes.ADD_FAMILY_FAILURE:
    case FamilyActionTypes.LIST_FAMILIES_FAILURE: {
      const res: HttpErrorResponse = action.payload;
      const message: Message = {
        type: MessageType.FAILURE,
        text: res.message
      };
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        message: message
      });
    }

    case FamilyActionTypes.UPDATE_FAMILY_SUCCESS: {
      const family: Family = action.payload;
      const message: Message = {
        type: MessageType.SUCCESS,
        text: 'Successfully updated family ' + family.name
      };
      return {
        loaded: true,
        loading: false,
        message: message,
        families: state.families.map((f: Family) => {
          return f.id === family.id ? Object.assign({}, f, family) : f;
        })
      };
    }

    case FamilyActionTypes.LIST_FAMILIES_SUCCESS: {
      const families: Family[] = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        families: [...families]
      });
    }

    case FamilyActionTypes.ADD_FAMILY_SUCCESS: {
      const family: Family = action.payload;
      const message: Message = {
        type: MessageType.SUCCESS,
        text: 'Successfully added family ' + family.name
      };
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        message: message,
        families: [...state.families, family]
      });
    }

    case FamilyActionTypes.CLEAR_FAMILY_MESSAGE:
      return Object.assign({}, state, {
        message: undefined
      });

    default:
      return state;
  }
}

export const loadedFamilies: any = (state: FamilyState) => state.loaded;
export const loadingFamilies: any = (state: FamilyState) => state.loading;
export const messageFamilies: any = (state: FamilyState) => state.message;

export const families: any = (state: FamilyState) => state.families;
