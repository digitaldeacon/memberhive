import { createSelector } from '@ngrx/store';
import { Interaction, InteractionCollection } from './interaction.model';
import * as actions from './interaction.actions';
import * as common from '../../common/common.model';

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
            return Object.assign({}, state, {
                loading: true
            });

        case actions.LIST_INTERACTIONS_SUCCESS: {
            const interactions: Interaction[] = action.payload;
            // console.log('from reducer[I]', action.payload);
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                interactions: interactions
            });
        }

        case actions.ADD_INTERACTION_SUCCESS: {
            const interaction: Interaction = action.payload;
            // console.log('from reducer[I]', action.payload);
            return Object.assign({}, state, {
                loaded: true,
                loading: false,
                interactions: [...state.interactions, interaction]
            });
        }

        case actions.LIST_INTERACTIONS_FAILURE:
        case actions.UPDATE_INTERACTION_FAILURE:
        case actions.ADD_INTERACTION_FAILURE: {
            const message: common.Message = {
                type: common.MESSAGE_FAILURE,
                text: action.payload
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

export const getInteractionsPerson: any = createSelector(getInteractions, getSelectedId, (interactions: any, selectedId: string) => {
    return interactions.filter((interaction: Interaction) => interaction.recipients.indexOf(selectedId) > -1);
});
