import { Action } from '@ngrx/store';
import { HttpResponse } from '@angular/common/http';
import { Interaction, InteractionCompletePayload } from './interaction.model';

export enum InteractionActionTypes {
  ADD_INTERACTION = '[Interaction] Add Interaction',
  ADD_INTERACTION_SUCCESS = '[Interaction] Add Interaction Success',
  ADD_INTERACTION_FAILURE = '[Interaction] Add Interaction Fail',
  DELETE_INTERACTION = '[Interaction] Delete Interaction',
  DELETE_INTERACTION_SUCCESS = '[Interaction] Delete Interaction Success',
  DELETE_INTERACTION_FAILURE = '[Interaction] Delete Interaction Fail',
  LIST_INTERACTIONS = '[Interaction] List Interactions',
  LIST_INTERACTIONS_SUCCESS = '[Interaction] List Interactions Success',
  LIST_INTERACTIONS_FAILURE = '[Interaction] List Interactions Fail',
  UPDATE_INTERACTION = '[Interaction] Update Interaction',
  UPDATE_INTERACTION_SUCCESS = '[Interaction] Update Interaction Success',
  UPDATE_INTERACTION_FAILURE = '[Interaction] Update Interaction Fail',
  CLEAR_INTERACTION_MESSAGE = '[Interaction] Clear Message',
  COMPLETE_INTERACTION = '[Interaction] Complete',
  COMPLETE_INTERACTION_SUCCESS = '[Interaction] Complete Success',
  COMPLETE_INTERACTION_FAILURE = '[Interaction] Complete Failure',
  END_INTERACTION = '[Interaction] End',
  END_INTERACTION_SUCCESS = '[Interaction] End Success',
  END_INTERACTION_FAILURE = '[Interaction] End Failure',
  GET_FOR_PERSON = '[Interaction] Get interactions for person'
}

export class ListInteractionsAction implements Action {
  readonly type = InteractionActionTypes.LIST_INTERACTIONS;
  constructor(public payload?: any) {}
}
export class ListInteractionsSuccessAction implements Action {
  readonly type = InteractionActionTypes.LIST_INTERACTIONS_SUCCESS;
  constructor(public payload: Interaction[]) {}
}
export class ListInteractionsFailureAction implements Action {
  readonly type = InteractionActionTypes.LIST_INTERACTIONS_FAILURE;
  constructor(public payload: HttpResponse<any>) {}
}
export class AddInteractionAction implements Action {
  readonly type = InteractionActionTypes.ADD_INTERACTION;
  constructor(public payload: Interaction) {}
}
export class AddInteractionSuccessAction implements Action {
  readonly type = InteractionActionTypes.ADD_INTERACTION_SUCCESS;
  constructor(public payload: Interaction) {}
}
export class AddInteractionFailureAction implements Action {
  readonly type = InteractionActionTypes.ADD_INTERACTION_FAILURE;
  constructor(public payload: HttpResponse<any>) {}
}
export class DeleteInteractionAction implements Action {
  readonly type = InteractionActionTypes.DELETE_INTERACTION;
  constructor(public payload: number) {}
}
export class DeleteInteractionSuccessAction implements Action {
  readonly type = InteractionActionTypes.DELETE_INTERACTION_SUCCESS;
  constructor(public payload: any) {}
}
export class DeleteInteractionFailureAction implements Action {
  readonly type = InteractionActionTypes.DELETE_INTERACTION_FAILURE;
  constructor(public payload: HttpResponse<any>) {}
}
export class UpdateInteractionAction implements Action {
  readonly type = InteractionActionTypes.UPDATE_INTERACTION;
  constructor(public payload: Interaction) {}
}
export class UpdateInteractionSuccessAction implements Action {
  readonly type = InteractionActionTypes.UPDATE_INTERACTION_SUCCESS;
  constructor(public payload: Interaction) {}
}
export class UpdateInteractionFailureAction implements Action {
  readonly type = InteractionActionTypes.UPDATE_INTERACTION_FAILURE;
  constructor(public payload: HttpResponse<any>) {}
}
export class CompleteInteractionAction implements Action {
  readonly type = InteractionActionTypes.COMPLETE_INTERACTION;
  constructor(public payload: InteractionCompletePayload) {}
}
export class CompleteInteractionSuccessAction implements Action {
  readonly type = InteractionActionTypes.COMPLETE_INTERACTION_SUCCESS;
  constructor(public payload: any) {}
}
export class CompleteInteractionFailureAction implements Action {
  readonly type = InteractionActionTypes.COMPLETE_INTERACTION_FAILURE;
  constructor(public payload: HttpResponse<any>) {}
}
export class EndInteractionAction implements Action {
  readonly type = InteractionActionTypes.END_INTERACTION;
  constructor(public payload: any) {}
}
export class EndInteractionsSuccessAction implements Action {
  readonly type = InteractionActionTypes.END_INTERACTION_SUCCESS;
  constructor(public payload: any) {}
}
export class EndInteractionsFailureAction implements Action {
  readonly type = InteractionActionTypes.END_INTERACTION_FAILURE;
  constructor(public payload: HttpResponse<any>) {}
}
export class ClearInteractionMessageAction implements Action {
  readonly type = InteractionActionTypes.CLEAR_INTERACTION_MESSAGE;
}
export class GetInteractionsPersonAction implements Action {
  readonly type = InteractionActionTypes.GET_FOR_PERSON;
  constructor(public payload: string) {}
}

export type InteractionActions =
  | AddInteractionAction
  | AddInteractionSuccessAction
  | AddInteractionFailureAction
  | DeleteInteractionAction
  | DeleteInteractionSuccessAction
  | DeleteInteractionFailureAction
  | UpdateInteractionAction
  | UpdateInteractionSuccessAction
  | UpdateInteractionFailureAction
  | ListInteractionsAction
  | ListInteractionsSuccessAction
  | ListInteractionsFailureAction
  | EndInteractionAction
  | EndInteractionsSuccessAction
  | EndInteractionsFailureAction
  | CompleteInteractionAction
  | CompleteInteractionSuccessAction
  | CompleteInteractionFailureAction
  | ClearInteractionMessageAction
  | GetInteractionsPersonAction;
