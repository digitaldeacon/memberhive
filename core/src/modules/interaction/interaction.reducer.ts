import { Interaction } from './interaction.model';
import * as actions from './interaction.actions';

export interface InteractionState {
    loaded?: boolean;
    loading?: boolean;
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

        case actions.ADD_INTERACTION: {
            return state;
        }

        case actions.LIST_INTERACTIONS: {
            return state;
        }

        default:
            return state;
    }
}

export const getEntities: any = (state: InteractionState) => state;
