import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Family } from './family.model';

export const LIST_FAMILIES = '[Family] List Families';
export const LIST_FAMILIES_SUCCESS = '[Family] List Success';
export const LIST_FAMILIES_FAILURE = '[Family] List Failure';

export class ListFamiliesAction implements Action {
    readonly type = LIST_FAMILIES;
    constructor(public payload: any) { }
}

export class ListFamiliesSuccessAction implements Action {
    readonly type = LIST_FAMILIES_SUCCESS;
    constructor(public payload: Family[]) { }
}

export class ListFamiliesFailureAction implements Action {
    readonly type = LIST_FAMILIES_FAILURE;
    constructor(public payload: HttpErrorResponse) { }
}

export type FamilyActions =
    ListFamiliesAction
    | ListFamiliesSuccessAction
    | ListFamiliesFailureAction;
