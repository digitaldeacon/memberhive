import { HttpResponse } from '@angular/common/http';
import { Tag } from './tag.model';
import * as actions from './tag.actions';
import * as common from '../../common/common.model';

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

        case actions.UPDATE_TAGS:
        case actions.LIST_TAGS:
            return Object.assign({}, state, {
                loading: true
            });

        case actions.UPDATE_TAGS_FAILURE:
        case actions.LIST_TAGS_FAILURE: {
            const res: HttpResponse<any> = action.payload;
            const message: common.Message = {
                type: common.MessageType.FAILURE,
                text: res.statusText
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

        case actions.UPDATE_TAGS_SUCCESS: {
            const tags: Tag[] = action.payload;
            const message: common.Message = {
                type: common.MessageType.SUCCESS,
                text: 'Successfully updated tags'
            };
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                message: message
                /*tags: state.tags.map((i: Tag[]) => {
                    return i.uid === interaction.uid ? Object.assign({}, i, interaction) : i;
                })*/
            });
        }

        default:
            return state;
    }
}

export const loadedTags: any = (state: TagState) => state.loaded;
export const loadingTags: any = (state: TagState) => state.loading;
export const messageTags: any = (state: TagState) => state.message;

export const tags: any = (state: TagState) => state.tags
