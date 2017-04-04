import { Action } from '@ngrx/store';

export const personActionTypes: any = {
    GET: '[Person] Get',
    UPDATE: '[Person] Update',
    LIST: '[People] List',
    VIEW: '[Person] View',
    CREATE: '[Person] Create'
};

export class GetAction implements Action {
    type: any = personActionTypes.GET;
}

export class UpdateAction implements Action {
    type: any = personActionTypes.UPDATE;
    constructor(public payload: string) { }
}

export class ViewAction implements Action {
    type: any = personActionTypes.VIEW;
    constructor(public payload: string) { }
}

export class CreateAction implements Action {
    type: any = personActionTypes.CREATE;
    constructor(public payload: string) { }
}

export class ListAction implements Action {
    type: any = personActionTypes.LIST;
    constructor(public payload: string) { }
}

export type PersonActions =
    GetAction
    | UpdateAction
    | ViewAction
    | ListAction;
