import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Person, CalcGeoCodePayload } from './person.model';

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
export const DELETE_PERSON = '[Person] Delete';
export const DELETE_PERSON_SUCCESS = '[Person] Delete Success';
export const DELETE_PERSON_FAILURE = '[Person] Delete Failure';
export const CLEAR_PERSON_MESSAGE = '[Person] Clear Message';
export const CALC_PERSON_GEO = '[Person] Calc Geo Codes';
export const CALC_PERSON_GEO_SUCCESS = '[Person] Calc Geo Codes Success';
export const CALC_PERSON_GEO_FAILURE = '[Person] Calc Geo Codes Failure';

export class ListPeopleAction implements Action {
  readonly type = LIST_PEOPLE;
  constructor(public payload: any) {}
}

export class ListPeolpeSuccessAction implements Action {
  readonly type = LIST_PEOPLE_SUCCESS;
  constructor(public payload: Person[]) {}
}

export class ListPeolpeFailureAction implements Action {
  readonly type = LIST_PEOPLE_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class ViewPersonAction implements Action {
  readonly type = VIEW_PERSON;
  constructor(public payload: string) {}
}

export class UpdatePersonAction implements Action {
  readonly type = UPDATE_PERSON;
  constructor(public payload: any) {}
}

export class UpdatePersonSuccessAction implements Action {
  readonly type = UPDATE_PERSON_SUCCESS;
  constructor(public payload: Person) {}
}

export class UpdatePersonFailureAction implements Action {
  readonly type = UPDATE_PERSON_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class CreatePersonAction implements Action {
  readonly type = CREATE_PERSON;
  constructor(public payload: Person) {}
}

export class CreatePersonSuccessAction implements Action {
  readonly type = CREATE_PERSON_SUCCESS;
  constructor(public payload: Person) {}
}

export class CreatePersonFailureAction implements Action {
  readonly type = CREATE_PERSON_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class DeletePersonAction implements Action {
  readonly type = DELETE_PERSON;
  constructor(public payload: Person) {}
}

export class DeletePersonSuccessAction implements Action {
  readonly type = DELETE_PERSON_SUCCESS;
  constructor(public payload: any) {}
}

export class DeletePersonFailureAction implements Action {
  readonly type = DELETE_PERSON_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class ClearPersonMessageAction implements Action {
  readonly type = CLEAR_PERSON_MESSAGE;
}

export class CalcPersonGeoAction implements Action {
  readonly type = CALC_PERSON_GEO;
  constructor(public payload: CalcGeoCodePayload) {}
}

export class CalcPersonGeoSuccessAction implements Action {
  readonly type = CALC_PERSON_GEO_SUCCESS;
  constructor(public payload: CalcGeoCodePayload) {}
}

export class CalcPersonGeoFailureAction implements Action {
  readonly type = CALC_PERSON_GEO_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export type PersonActions =
  | ListPeopleAction
  | ListPeolpeSuccessAction
  | ListPeolpeFailureAction
  | ViewPersonAction
  | UpdatePersonAction
  | UpdatePersonSuccessAction
  | UpdatePersonFailureAction
  | CreatePersonAction
  | CreatePersonSuccessAction
  | CreatePersonFailureAction
  | ClearPersonMessageAction
  | DeletePersonAction
  | DeletePersonSuccessAction
  | DeletePersonFailureAction
  | CalcPersonGeoAction
  | CalcPersonGeoSuccessAction
  | CalcPersonGeoFailureAction;
