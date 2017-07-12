import { Response } from '@angular/http';
import { Interaction, InteractionCollection } from './interaction.model';
import * as actions from './interaction.actions';
import * as common from '../../common/common.model';
import { Utils } from '../../common/common.utils';

export interface InteractionState {
    loaded?: boolean;
    loading?: boolean;
    message?: common.Message;
    forPersonId?: string;
    interactions: Interaction[];
    myInteractions: Interaction[];
}

const initialState: InteractionState = {
    interactions: [],
    myInteractions: []
};

export function interactionReducer(state: InteractionState = initialState,
action: actions.InteractionActions): InteractionState {
    switch (action.type) {

        case actions.LIST_INTERACTIONS:
        case actions.ADD_INTERACTION:
        case actions.DELETE_INTERACTION:
        case actions.COMPLETE_INTERACTION:
            return Object.assign({}, state, {
                loading: true
            });

        case actions.LIST_INTERACTIONS_SUCCESS: {
            const interactions: Interaction[] = action.payload;
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                interactions: interactions
            });
        }

        case actions.ADD_INTERACTION_SUCCESS: {
            const interaction: Interaction = action.payload;
            const message: common.Message = {
                type: common.MESSAGE_SUCCESS,
                text: 'Successfully added an interaction'
            };
            let interactions: Interaction[] = [...state.interactions, interaction];
            interactions.sort((i1: Interaction, i2: Interaction) => {
                const left: Date = new Date(i1.createdAt);
                const right: Date = new Date(i2.createdAt);
                const now: Date = new Date();
                left.setFullYear(now.getFullYear());
                right.setFullYear(now.getFullYear());
                return right.getTime() - left.getTime();
            });
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                message: message,
                interactions: interactions
            });
        }

        case actions.UPDATE_INTERACTION_SUCCESS: {
            const interaction: Interaction = action.payload;
            const message: common.Message = {
                type: common.MESSAGE_SUCCESS,
                text: 'Successfully updated this interaction'
            };
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                message: message,
                interactions: state.interactions.map((i: Interaction) => {
                    return i.uid === interaction.uid ? Object.assign({}, i, interaction) : i;
                })
            });
        }

        case actions.DELETE_INTERACTION_SUCCESS: {
            const message: common.Message = {
                type: common.MESSAGE_SUCCESS,
                text: 'Successfully deleted this interaction'
            };
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                message: message,
                interactions: state.interactions.filter((i: Interaction) => i.id !== action.payload)
            });
        }

        case actions.LIST_INTERACTIONS_FAILURE:
        case actions.DELETE_INTERACTION_FAILURE:
        case actions.UPDATE_INTERACTION_FAILURE:
        case actions.ADD_INTERACTION_FAILURE: {
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

        case actions.GET_FOR_PERSON: {
            return Object.assign({}, state, {
                forPersonId: action.payload
            });
        }

        case actions.CLEAR_INTERACTION_MESSAGE:
            return Object.assign({}, state, {
                message: undefined
            });

        default:
            return state;
    }
}

export const getLoadedInteraction: any = (state: InteractionState) => state.loaded;
export const getLoadingInteraction: any = (state: InteractionState) => state.loading;
export const getMessageInteraction: any = (state: InteractionState) => state.message;

export const getInteractions: any = (state: InteractionState) => state.interactions;
export const getMyInteractions: any = (state: InteractionState) => state.myInteractions;

const getSelectedId: any = (state: InteractionState) => state.forPersonId;
