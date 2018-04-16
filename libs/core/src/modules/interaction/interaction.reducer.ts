import { HttpResponse } from "@angular/common/http";
import { Interaction, InteractionCollection } from "./interaction.model";
import * as actions from "./interaction.actions";
import * as common from "../../common/common.model";
import { Utils } from "../../common/common.utils";

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

export function interactionReducer(
  state: InteractionState = initialState,
  action: actions.InteractionActions
): InteractionState {
  switch (action.type) {
    case actions.LIST_INTERACTIONS:
    case actions.ADD_INTERACTION:
    case actions.DELETE_INTERACTION:
    case actions.COMPLETE_INTERACTION:
      return Object.assign({}, state, {
        loading: true
      });

    case actions.LIST_INTERACTIONS_SUCCESS: {
      const interact: Interaction[] = action.payload;
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        interactions: interact
      });
    }

    case actions.ADD_INTERACTION_SUCCESS: {
      const interaction: Interaction = action.payload;
      const message: common.Message = {
        type: common.MessageType.SUCCESS,
        text: "Successfully added an interaction"
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

    case actions.UPDATE_INTERACTION_SUCCESS: {
      const interaction: Interaction = action.payload;
      const message: common.Message = {
        type: common.MessageType.SUCCESS,
        text: "Successfully updated this interaction"
      };
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        message: message,
        interactions: state.interactions.map((i: Interaction) => {
          return i.uid === interaction.uid
            ? Object.assign({}, i, interaction)
            : i;
        })
      });
    }

    case actions.DELETE_INTERACTION_SUCCESS: {
      const message: common.Message = {
        type: common.MessageType.SUCCESS,
        text: "Successfully deleted this interaction"
      };
      return Object.assign({}, state, {
        loaded: true,
        loading: false,
        message: message,
        interactions: state.interactions.filter(
          (i: Interaction) => i.id !== action.payload
        )
      });
    }

    case actions.LIST_INTERACTIONS_FAILURE:
    case actions.DELETE_INTERACTION_FAILURE:
    case actions.UPDATE_INTERACTION_FAILURE:
    case actions.ADD_INTERACTION_FAILURE: {
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

export const loadedInteraction: any = (state: InteractionState) => state.loaded;
export const loadingInteraction: any = (state: InteractionState) =>
  state.loading;
export const messageInteraction: any = (state: InteractionState) =>
  state.message;

export const interactions: any = (state: InteractionState) =>
  state.interactions;

const selectedId: any = (state: InteractionState) => state.forPersonId;
