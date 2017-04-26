import { Action } from '@ngrx/store';
import { Person } from './person.model';

export const personActionTypes: any = {
    LIST: '[People] List',
    LIST_SUCCESS: '[People] List Success',
    LIST_FAIL: '[People] List Fail',
    UPDATE: '[Person] Update',
    LOAD_VIEW: '[Person] Load View',
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

export class PersonViewAction implements Action {
    type: any = personActionTypes.VIEW;
    constructor(public payload: string) { }
}

export class PersonLoadViewAction implements Action {
    type: any = personActionTypes.LOAD_VIEW;
    constructor(public payload: Person) { }
}

export type PersonActions =
    ListAction
    | ListSuccessAction
    | ListFailAction
    | PersonViewAction
    | PersonLoadViewAction;
