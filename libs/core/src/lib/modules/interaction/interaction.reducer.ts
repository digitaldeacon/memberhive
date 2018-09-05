import { HttpResponse } from '@angular/common/http';
import { Interaction } from './interaction.model';
import { InteractionActions, InteractionActionTypes } from './interaction.actions';

import { Message, MessageType } from '../../common/common.model';
import { Utils } from '../../common/common.utils';

export interface InteractionState {
  loaded?: boolean;
  loading?: boolean;
  message?: Message;
  forPersonId?: string;
  interactions: Interaction[];
  myInteractions: Interaction[];
}

const initialState: InteractionState = {
  interactions: [],
  myInteractions: []
};

export function interactionReducer(
  state: InteractionState = initialState,
  action: InteractionActions
): InteractionState {
  switch (action.type) {
    case InteractionActionTypes.LIST_INTERACTIONS:
    case InteractionActionTypes.ADD_INTERACTION:
    case InteractionActionTypes.DELETE_INTERACTION:
    case InteractionActionTypes.COMPLETE_INTERACTION:
      return Object.assign({}, state, {
        loading: true
      });

    case InteractionActionTypes.LIST_INTERACTIONS_SUCCESS: {
      const interact: Interaction[] = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        interactions: interact
      });
    }

    case InteractionActionTypes.ADD_INTERACTION_SUCCESS: {
      const interaction: Interaction = action.payload;
      const message: Message = {
        type: MessageType.SUCCESS,
        text: 'Successfully added an interaction'
      };
      const newInteract: Interaction[] = [...state.interactions, interaction];
      newInteract.sort((i1: Interaction, i2: Interaction) => {
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
        interactions: newInteract
      });
    }

    case InteractionActionTypes.UPDATE_INTERACTION_SUCCESS: {
      const interaction: Interaction = action.payload;
      const message: Message = {
        type: MessageType.SUCCESS,
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

    case InteractionActionTypes.DELETE_INTERACTION_SUCCESS: {
      const message: Message = {
        type: MessageType.SUCCESS,
        text: 'Successfully deleted this interaction'
      };
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        message: message,
        interactions: state.interactions.filter((i: Interaction) => i.id !== action.payload)
      });
    }

    case InteractionActionTypes.LIST_INTERACTIONS_FAILURE:
    case InteractionActionTypes.DELETE_INTERACTION_FAILURE:
    case InteractionActionTypes.UPDATE_INTERACTION_FAILURE:
    case InteractionActionTypes.ADD_INTERACTION_FAILURE: {
      const res: HttpResponse<any> = action.payload;
      const message: Message = {
        type: MessageType.FAILURE,
        text: res.statusText
      };
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        message: message
      });
    }

    case InteractionActionTypes.GET_FOR_PERSON: {
      return Object.assign({}, state, {
        forPersonId: action.payload
      });
    }

    case InteractionActionTypes.CLEAR_INTERACTION_MESSAGE:
      return Object.assign({}, state, {
        message: undefined
      });

    default:
      return state;
  }
}

export const loadedInteraction: any = (state: InteractionState) => state.loaded;
export const loadingInteraction: any = (state: InteractionState) => state.loading;
export const messageInteraction: any = (state: InteractionState) => state.message;

export const interactions: any = (state: InteractionState) => state.interactions;

const selectedId: any = (state: InteractionState) => state.forPersonId;
