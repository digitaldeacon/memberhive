import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { HttpErrorResponse } from '@angular/common/http';
import { Family } from './family.model';
import * as actions from './family.actions';
import * as common from '../../common/common.model';

export interface FamilyState {
    loaded?: boolean;
    loading?: boolean;
    message?: common.Message;
    families: Family[];
}

const initialState: FamilyState = {
    families: []
};

export function familyReducer(state: FamilyState = initialState,
                           action: actions.FamilyActions): FamilyState {
    switch (action.type) {

        case actions.ADD_FAMILY:
        case actions.LIST_FAMILIES:
            return Object.assign({}, state, {
                loading: true
            });

        case actions.ADD_FAMILY_FAILURE:
        case actions.LIST_FAMILIES_FAILURE: {
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

        case actions.LIST_FAMILIES_SUCCESS: {
            const families: Family[] = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                families: [...families]
            });
        }

        case actions.ADD_FAMILY_SUCCESS: {
            const family: Family = action.payload;
            const message: common.Message = {
                type: common.MESSAGE_SUCCESS,
                text: 'Successfully added family ' + family.name
            };
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                message: message,
                families: [...state.families, family]
            });
        }

        default:
            return state;
    }
}

export const loadedFamilies: any = (state: FamilyState) => state.loaded;
export const loadingFamilies: any = (state: FamilyState) => state.loading;
export const messageFamilies: any = (state: FamilyState) => state.message;

export const families: any = (state: FamilyState) => state.families;
