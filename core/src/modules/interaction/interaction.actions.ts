import { Action } from '@ngrx/store';
import { type } from '../../util';

export const interactionActionTypes: any = {
    ADD_INTERACTION:   type('[Interaction] Add Interaction'),
    DELETE_INTERACTION:   type('[Interaction] Delete Interaction'),
    LOAD_INTERACTION:   type('[Interaction] Load Interaction')
};

export class AddAction implements Action {
    type: any = interactionActionTypes.ADD_INTERACTION;
    constructor(public payload: any) { }
}

export class DeleteAction implements Action {
    type: any = interactionActionTypes.DELETE_INTERACTION;
    constructor(public payload: any) { }
}

export class LoadAction implements Action {
    type: any = interactionActionTypes.LOAD_INTERACTION;
    constructor(public payload: any[]) { }
}

export type InteractionActions
    = AddAction
    | DeleteAction
    | LoadAction;
