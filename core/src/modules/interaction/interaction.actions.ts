import { Action } from '@ngrx/store';
import {
    Interaction,
    InteractionPayload,
    InteractionCollection
} from './interaction.model';

export const ADD_INTERACTION = '[Interaction] Add Interaction';
export const ADD_INTERACTION_SUCCESS = '[Interaction] Add Interaction Success';
export const ADD_INTERACTION_FAILURE = '[Interaction] Add Interaction Fail';
export const DELETE_INTERACTION = '[Interaction] Delete Interaction';
export const DELETE_INTERACTION_SUCCESS = '[Interaction] Delete Interaction Success';
export const DELETE_INTERACTION_FAILURE = '[Interaction] Delete Interaction Fail';
export const LIST_INTERACTIONS = '[Interaction] List Interactions';
export const LIST_INTERACTIONS_SUCCESS = '[Interaction] List Interactions Success';
export const LIST_INTERACTIONS_FAILURE = '[Interaction] List Interactions Fail';
export const UPDATE_INTERACTION = '[Interaction] Update Interaction';
export const UPDATE_INTERACTION_SUCCESS = '[Interaction] Update Interaction Success';
export const UPDATE_INTERACTION_FAILURE = '[Interaction] Update Interaction Fail';
export const CLEAR_INTERACTION_MESSAGE = '[Interaction] Clear Message';
export const COMPLETE_INTERACTION = '[Interaction] Complete';
export const COMPLETE_INTERACTION_SUCCESS = '[Interaction] Complete Success';
export const COMPLETE_INTERACTION_FAILURE = '[Interaction] Complete Failure';
export const END_INTERACTION = '[Interaction] End';
export const END_INTERACTION_SUCCESS = '[Interaction] End Success';
export const END_INTERACTION_FAILURE = '[Interaction] End Failure';
export const GET_FOR_PERSON = '[Interaction] Get interactions for person';

export class ListInteractionsAction implements Action {
    readonly type = LIST_INTERACTIONS;
    constructor(public payload?: any) { }
}
export class ListInteractionsSuccessAction implements Action {
    readonly type = LIST_INTERACTIONS_SUCCESS;
    constructor(public payload: Interaction[]) { }
}
export class ListInteractionsFailureAction implements Action {
    readonly type = LIST_INTERACTIONS_FAILURE;
    constructor(public payload: any) { }
}
export class AddInteractionAction implements Action {
    readonly type = ADD_INTERACTION;
    constructor(public payload: Interaction) { }
}
export class AddInteractionSuccessAction implements Action {
    readonly type = ADD_INTERACTION_SUCCESS;
    constructor(public payload: Interaction) { }
}
export class AddInteractionFailureAction implements Action {
    readonly type = ADD_INTERACTION_FAILURE;
    constructor(public payload: any) { }
}
export class DeleteInteractionAction implements Action {
    readonly type = DELETE_INTERACTION;
    constructor(public payload: any) { }
}
export class DeleteInteractionSuccessAction implements Action {
    readonly type = DELETE_INTERACTION_SUCCESS;
    constructor(public payload: any) { }
}
export class DeleteInteractionFailureAction implements Action {
    readonly type = DELETE_INTERACTION_FAILURE;
    constructor(public payload: any) { }
}
export class UpdateInteractionAction implements Action {
    readonly type = UPDATE_INTERACTION;
    constructor(public payload: Interaction) { }
}
export class UpdateInteractionSuccessAction implements Action {
    readonly type = UPDATE_INTERACTION_SUCCESS;
    constructor(public payload: Interaction) { }
}
export class UpdateInteractionFailureAction implements Action {
    readonly type = UPDATE_INTERACTION_FAILURE;
    constructor(public payload: any) { }
}
export class CompleteInteractionAction implements Action {
    readonly type = COMPLETE_INTERACTION;
    constructor(public payload: any) { }
}
export class CompleteInteractionSuccessAction implements Action {
    readonly type = COMPLETE_INTERACTION_SUCCESS;
    constructor(public payload: any) { }
}
export class CompleteInteractionFailureAction implements Action {
    readonly type = COMPLETE_INTERACTION_FAILURE;
    constructor(public payload: any) { }
}
export class EndInteractionAction implements Action {
    readonly type = END_INTERACTION;
    constructor(public payload: any) { }
}
export class EndInteractionsSuccessAction implements Action {
    readonly type = END_INTERACTION_SUCCESS;
    constructor(public payload: any) { }
}
export class EndInteractionsFailureAction implements Action {
    readonly type = END_INTERACTION_FAILURE;
    constructor(public payload: any) { }
}
export class ClearInteractionMessageAction implements Action {
    readonly type = CLEAR_INTERACTION_MESSAGE;
}
export class GetInteractionsPersonAction implements Action {
    readonly type = GET_FOR_PERSON;
    constructor(public payload: string) { }
}

export type InteractionActions
    = AddInteractionAction
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
