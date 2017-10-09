import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Response } from '@angular/http';
import { Tag, Tags } from './tag.model';
import * as actions from './tag.actions';
import * as common from '../../common/common.model';
import { Utils } from '../../common/common.utils';

export interface TagState {
    loaded?: boolean;
    loading?: boolean;
    message?: common.Message;
    tags: Tag[];
}

const initialState: TagState = {
    tags: [
        {id: 1, text: 'Member', type: 'status', context: 'person'},
        {id: 2, text: 'Visitor', type: 'status', context: 'person'},
        {id: 3, text: 'Contact', type: 'status', context: 'person'}
    ]
};

export function tagReducer(state: TagState = initialState,
                                   action: actions.TagActions): TagState {
    switch (action.type) {

        case actions.LIST_TAGS:
            return Object.assign({}, state, {
                loading: true
            });

        case actions.LIST_TAGS_FAILURE: {
            const res: Response = action.payload;
            const message: common.Message = {
                type: common.MESSAGE_FAILURE,
                text: Utils.responseErrors(res)
            };
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                message: message
            });
        }

        case actions.LIST_TAGS_SUCCESS: {
            const tags: Tag[] = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                tags: [...tags]
            });
        }

        default:
            return state;
    }
}

export const getLoadedTags: any = (state: TagState) => state.loaded;
export const getLoadingTags: any = (state: TagState) => state.loading;
export const getMessageTags: any = (state: TagState) => state.message;

export const getTags: any = (state: TagState) => state.tags
