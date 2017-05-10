import { Interaction } from './interaction';
import * as interaction from './interaction.actions';

export type InteractionState = Interaction[];

const initialState: InteractionState = [];

export function interactionReducer(state: InteractionState = initialState,
action: interaction.InteractionActions): InteractionState {
    switch (action.type) {

        case interaction.interactionActionTypes.ADD_INTERACTION: {
            return [ ...state, ...action.payload ];
        }

        case interaction.interactionActionTypes.LOAD_INTERACTION: {
            return action.payload;
        }

        default:
            return state;
    }
}

export const getEntities: any = (state: InteractionState) => state;
