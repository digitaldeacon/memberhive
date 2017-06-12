import { Action } from '@ngrx/store';
import { Interaction } from './interaction.model';

export const ADD_INTERACTION = '[Interaction] Add Interaction';
export const ADD_INTERACTION_SUCCESS = '[Interaction] Add Interaction Success';
export const ADD_INTERACTION_FAIL = '[Interaction] Add Interaction Fail';
export const DELETE_INTERACTION = '[Interaction] Delete Interaction';
export const DELETE_INTERACTION_SUCCESS = '[Interaction] Delete Interaction Success';
export const DELETE_INTERACTION_FAIL = '[Interaction] Delete Interaction Fail';
export const LIST_INTERACTIONS = '[Interaction] List Interactions';
export const LIST_INTERACTIONS_SUCCESS = '[Interaction] List Interactions Success';
export const LIST_INTERACTIONS_FAIL = '[Interaction] List Interactions Fail';

export class AddInteractionAction implements Action {
    readonly type = ADD_INTERACTION;
    constructor(public payload: Interaction) { }
}
export class AddInteractionSuccessAction implements Action {
    readonly type = ADD_INTERACTION_SUCCESS;
    constructor(public payload: Interaction) { }
}
export class AddInteractionFailAction implements Action {
    readonly type = ADD_INTERACTION_FAIL;
    constructor(public payload: any) { }
}

export class DeleteInteractionAction implements Action {
    readonly type = DELETE_INTERACTION;
    constructor(public payload: any) { }
}

export class ListInteractionAction implements Action {
    readonly type = LIST_INTERACTIONS;
    constructor(public payload: any[]) { }
}

export type InteractionActions
    = AddInteractionAction
    | DeleteInteractionAction
    | ListInteractionAction;
