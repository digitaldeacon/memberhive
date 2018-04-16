import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Person, CalcGeoCodePayload, AvatarPayload } from './person.model';

export enum PeopleActionTypes {
    LIST_PEOPLE = '[People] List',
    LIST_PEOPLE_SUCCESS = '[People] List Success',
    LIST_PEOPLE_FAILURE = '[People] List Failure',
    UPDATE_PERSON = '[Person] Update',
    UPDATE_PERSON_SUCCESS = '[Person] Update Success',
    UPDATE_PERSON_FAILURE = '[Person] Update Failure',
    VIEW_PERSON = '[Person] View',
    CREATE_PERSON = '[Person] Create',
    CREATE_PERSON_SUCCESS = '[Person] Create Success',
    CREATE_PERSON_FAILURE = '[Person] Create Failure',
    DELETE_PERSON = '[Person] Delete',
    DELETE_PERSON_SUCCESS = '[Person] Delete Success',
    DELETE_PERSON_FAILURE = '[Person] Delete Failure',
    CLEAR_PERSON_MESSAGE = '[Person] Clear Message',
    CALC_PERSON_GEO = '[Person] Calc Geo Codes',
    CALC_PERSON_GEO_SUCCESS = '[Person] Calc Geo Codes Success',
    CALC_PERSON_GEO_FAILURE = '[Person] Calc Geo Codes Failure',
    UPLOAD_PERSON_AVATAR = '[Person] Upload person avatar'
}

export class ListPeopleAction implements Action {
  readonly type = PeopleActionTypes.LIST_PEOPLE;
  constructor(public payload: any) {}
}

export class ListPeopleSuccessAction implements Action {
  readonly type = PeopleActionTypes.LIST_PEOPLE_SUCCESS;
  constructor(public payload: Person[]) {}
}

export class ListPeopleFailureAction implements Action {
  readonly type = PeopleActionTypes.LIST_PEOPLE_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class ViewPersonAction implements Action {
  readonly type = PeopleActionTypes.VIEW_PERSON;
  constructor(public payload: string) {}
}

export class UpdatePersonAction implements Action {
  readonly type = PeopleActionTypes.UPDATE_PERSON;
  constructor(public payload: any) {}
}

export class UpdatePersonSuccessAction implements Action {
  readonly type = PeopleActionTypes.UPDATE_PERSON_SUCCESS;
  constructor(public payload: Person) {}
}

export class UpdatePersonFailureAction implements Action {
  readonly type = PeopleActionTypes.UPDATE_PERSON_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class CreatePersonAction implements Action {
  readonly type = PeopleActionTypes.CREATE_PERSON;
  constructor(public payload: Person) {}
}

export class CreatePersonSuccessAction implements Action {
  readonly type = PeopleActionTypes.CREATE_PERSON_SUCCESS;
  constructor(public payload: Person) {}
}

export class CreatePersonFailureAction implements Action {
  readonly type = PeopleActionTypes.CREATE_PERSON_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class DeletePersonAction implements Action {
  readonly type = PeopleActionTypes.DELETE_PERSON;
  constructor(public payload: Person) {}
}

export class DeletePersonSuccessAction implements Action {
  readonly type = PeopleActionTypes.DELETE_PERSON_SUCCESS;
  constructor(public payload: any) {}
}

export class DeletePersonFailureAction implements Action {
  readonly type = PeopleActionTypes.DELETE_PERSON_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class ClearPersonMessageAction implements Action {
  readonly type = PeopleActionTypes.CLEAR_PERSON_MESSAGE;
}

export class CalcPersonGeoAction implements Action {
  readonly type = PeopleActionTypes.CALC_PERSON_GEO;
  constructor(public payload: CalcGeoCodePayload) {}
}

export class CalcPersonGeoSuccessAction implements Action {
  readonly type = PeopleActionTypes.CALC_PERSON_GEO_SUCCESS;
  constructor(public payload: CalcGeoCodePayload) {}
}

export class CalcPersonGeoFailureAction implements Action {
  readonly type = PeopleActionTypes.CALC_PERSON_GEO_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class UploadPersonAvatarAction implements Action {
    readonly type = PeopleActionTypes.UPLOAD_PERSON_AVATAR;
    constructor(public payload: any) {}
}

export type PeopleActions =
  | ListPeopleAction
  | ListPeopleSuccessAction
  | ListPeopleFailureAction
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
  | CalcPersonGeoFailureAction
  | UploadPersonAvatarAction;
