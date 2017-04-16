import { Action } from '@ngrx/store';
import { Person } from './person.model';

export const personActionTypes: any = {
    LIST: '[Person] List',
    LIST_SUCCESS: '[Person] List Success',
    LIST_FAIL: '[Person] List Fail',
    UPDATE: '[Person] Update',
    VIEW: '[Person] View',
    CREATE: '[Person] Create'
};

export class ListAction implements Action {
    type: any = personActionTypes.LIST;
    constructor(public payload: any) { }
}

export class ListSuccessAction implements Action {
    type: any = personActionTypes.LIST_SUCCESS;
    constructor(public payload: Person[]) { }
}

export class ListFailAction implements Action {
    type: any = personActionTypes.LIST_FAIL;
    constructor(public payload: any) { }
}

export type PersonActions =
    ListAction
    | ListSuccessAction
    | ListFailAction;
