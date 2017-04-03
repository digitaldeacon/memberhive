import { Action } from '@ngrx/store';
import { type } from '../../util';

export const InteractionActionTypes = {
    ADD_INTERACTION:   type('[Interaction] Add Interaction'),
    DELETE_INTERACTION:   type('[Interaction] Delete Interaction'),
    LOAD_INTERACTION:   type('[Interaction] Load Interaction')
};

export class AddAction implements Action {
    type = InteractionActionTypes.ADD_INTERACTION;
    constructor(public payload: any) { }
}

export class DeleteAction implements Action {
    type = InteractionActionTypes.DELETE_INTERACTION;
    constructor(public payload: any) { }
}

export class LoadAction implements Action {
    type = InteractionActionTypes.LOAD_INTERACTION;
    constructor(public payload: any[]) { }
}


export type InteractionActions
    = AddAction
    | DeleteAction
    | LoadAction