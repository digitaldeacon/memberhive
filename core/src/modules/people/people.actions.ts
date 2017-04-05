import { Action } from '@ngrx/store';
import { Person } from '../person/person.model';

export const peopleActionTypes: any = {
    LIST: '[People] List',
    LIST_SUCCESS: '[People] List Success',
    LIST_FAIL: '[People] List Fail',
    UPDATE: '[People] Update',
    VIEW: '[People] View',
    CREATE: '[People] Create',
};

export class ListAction implements Action {
    type: any = peopleActionTypes.LIST;
    constructor(public payload: any) { }
}

export class ListSuccessAction implements Action {
    type: any = peopleActionTypes.LIST_SUCCESS;
    constructor(public payload: Person[]) { }
}

export class ListFailAction implements Action {
    type: any = peopleActionTypes.LIST_FAIL;
    constructor(public payload: any) { }
}


export type PeopleActions =
    ListAction
    | ListSuccessAction
    | ListFailAction;
