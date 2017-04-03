import { Interaction } from './interaction';
import * as interaction from './interaction.actions';

export type InteractionState = Interaction[];

const initialState: InteractionState = [];

export function interactionReducer(state = initialState,
action: interaction.InteractionActions): InteractionState {
    switch (action.type) {
        case interaction.InteractionActionTypes.ADD_INTERACTION: {
            return [ ...state, ...action.payload ];
        };
        case interaction.InteractionActionTypes.LOAD_INTERACTION: {
            return action.payload;
        };

        default:
            return state;
    }
}

export const getEntities = (state: InteractionState) => state;
