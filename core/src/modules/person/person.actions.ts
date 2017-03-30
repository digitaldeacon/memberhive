import { Action } from '@ngrx/platform/modules/store';

export const PersonActionTypes = {
    GET: '[Person] Get',
    UPDATE: '[Person] Update',
    LIST: '[People] List',
    VIEW: '[Person] View',
    CREATE: '[Person] Create'
};

export class GetAction implements Action {
    type = PersonActionTypes.GET;
    constructor(public payload: string) { }
}

export class UpdateAction implements Action {
    type = PersonActionTypes.UPDATE;
    constructor(public payload: string) { }
}

export class ViewAction implements Action {
    type = PersonActionTypes.VIEW;
    constructor(public payload: string) { }
}

export class CreateAction implements Action {
    type = PersonActionTypes.CREATE;
    constructor(public payload: string) { }
}


export class ListAction implements Action {
    type = PersonActionTypes.LIST;
    constructor(public payload: string) { }
}

export type PersonActions =
    GetAction
    | UpdateAction
    | ViewAction
    | ListAction;