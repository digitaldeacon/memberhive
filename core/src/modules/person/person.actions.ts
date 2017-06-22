import { Action } from '@ngrx/store';
import { Person } from './person.model';

export const LIST_PEOPLE = '[People] List';
export const LIST_PEOPLE_SUCCESS = '[People] List Success';
export const LIST_PEOPLE_FAILURE = '[People] List Failure';
export const UPDATE_PERSON = '[Person] Update';
export const UPDATE_PERSON_SUCCESS = '[Person] Update Success';
export const UPDATE_PERSON_FAILURE = '[Person] Update Failure';
export const VIEW_PERSON = '[Person] View';
export const CREATE_PERSON = '[Person] Create';
export const CREATE_PERSON_SUCCESS = '[Person] Create Success';
export const CREATE_PERSON_FAILURE = '[Person] Create Failure';
export const CLEAR_PERSON_MESSAGE = '[Person] Clear Message';
export const CALC_PERSON_GEO = '[Person] Calc Geo Codes';
export const CALC_PERSON_GEO_SUCCESS = '[Person] Calc Geo Codes Success';
export const CALC_PERSON_GEO_FAILURE = '[Person] Calc Geo Codes Failure';

export class ListAction implements Action {
    readonly type = LIST_PEOPLE;
    constructor(public payload: any) { }
}

export class ListSuccessAction implements Action {
    readonly type = LIST_PEOPLE_SUCCESS;
    constructor(public payload: Person[]) { }
}

export class ListFailureAction implements Action {
    readonly type = LIST_PEOPLE_FAILURE;
    constructor(public payload: any) { }
}

export class PersonViewAction implements Action {
    readonly type = VIEW_PERSON;
    constructor(public payload: string) { }
}

export class PersonUpdateAction implements Action {
    readonly type = UPDATE_PERSON;
    constructor(public payload: any) { }
}

export class PersonUpdateSuccessAction implements Action {
    readonly type = UPDATE_PERSON_SUCCESS;
    constructor(public payload: Person) { }
}

export class PersonUpdateFailureAction implements Action {
    readonly type = UPDATE_PERSON_FAILURE;
    constructor(public payload: any) { }
}

export class PersonCreateAction implements Action {
    readonly type = CREATE_PERSON;
    constructor(public payload: Person) { }
}

export class PersonCreateSuccessAction implements Action {
    readonly type = CREATE_PERSON_SUCCESS;
    constructor(public payload: Person) { }
}

export class PersonCreateFailureAction implements Action {
    readonly type = CREATE_PERSON_FAILURE;
    constructor(public payload: any) { }
}

export class PersonClearMessageAction implements Action {
    readonly type = CLEAR_PERSON_MESSAGE;
}

export class PersonCalcGeoAction implements Action {
    readonly type = CALC_PERSON_GEO;
    constructor(public payload: Person) { }
}
export class PersonCalcGeoSuccessAction implements Action {
    readonly type = CALC_PERSON_GEO_SUCCESS;
    constructor(public payload: Person) { }
}
export class PersonCalcGeoFailureAction implements Action {
    readonly type = CALC_PERSON_GEO_FAILURE;
    constructor(public payload: any) { }
}

export type PersonActions =
    ListAction
    | ListSuccessAction
    | ListFailureAction
    | PersonViewAction
    | PersonUpdateAction
    | PersonUpdateSuccessAction
    | PersonUpdateFailureAction
    | PersonCreateAction
    | PersonCreateSuccessAction
    | PersonCreateFailureAction
    | PersonClearMessageAction
    | PersonCalcGeoAction
    | PersonCalcGeoSuccessAction
    | PersonCalcGeoFailureAction;
