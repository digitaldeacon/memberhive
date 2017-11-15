import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Family, FamilyPayload } from './family.model';

export const LIST_FAMILIES = '[Family] List Families';
export const LIST_FAMILIES_SUCCESS = '[Family] List Success';
export const LIST_FAMILIES_FAILURE = '[Family] List Failure';
export const ADD_FAMILY = '[Family] Add new family';
export const ADD_FAMILY_SUCCESS = '[Family] Add new family Success';
export const ADD_FAMILY_FAILURE = '[Family] Add new Family Failure';
export const UPDATE_FAMILY = '[Family] Update Family';
export const UPDATE_FAMILY_SUCCESS = '[Family] Update Family Success';
export const UPDATE_FAMILY_FAILURE = '[Family] Update Family Failure';
export const LINK_PERSON_FAMILY = '[Family] Link person to family';
export const SET_FAMILY_ROLE = '[Family] Set role in family';
export const ACCEPT_MEMBER = '[Family] Accept suggested member';
export const IGNORE_MEMBER = '[Family] Ignore suggested member';
export const REMOVE_MEMBER = '[Family] Remove family member';
export const CLEAR_FAMILY_MESSAGE = '[Family] Clear Message';

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

export class AddNewFamilyAction implements Action {
    readonly type = ADD_FAMILY;
    constructor(public payload: Family) { }
}

export class AddNewFamilySuccessAction implements Action {
    readonly type = ADD_FAMILY_SUCCESS;
    constructor(public payload: Family) { }
}

export class AddNewFamilyFailureAction implements Action {
    readonly type = ADD_FAMILY_FAILURE;
    constructor(public payload: HttpErrorResponse) { }
}

export class UpdateFamilyAction implements Action {
    readonly type = UPDATE_FAMILY;
    constructor(public payload: FamilyPayload) { }
}

export class UpdateFamilySuccessAction implements Action {
    readonly type = UPDATE_FAMILY_SUCCESS;
    constructor(public payload: Family) { }
}

export class UpdateFamilyFailureAction implements Action {
    readonly type = UPDATE_FAMILY_FAILURE;
    constructor(public payload: HttpErrorResponse) { }
}

export class LinkPersonFamilyAction implements Action {
    readonly type = LINK_PERSON_FAMILY;
    constructor(public payload: FamilyPayload) { }
}

export class AcceptMemberFamilyAction implements Action {
    readonly type = ACCEPT_MEMBER;
    constructor(public payload: FamilyPayload) { }
}

export class IgnoreMemberFamilyAction implements Action {
    readonly type = IGNORE_MEMBER;
    constructor(public payload: FamilyPayload) { }
}

export class RemoveMemberFamilyAction implements Action {
    readonly type = REMOVE_MEMBER;
    constructor(public payload: FamilyPayload) { }
}

export class SetFamilyRoleAction implements Action {
    readonly type = SET_FAMILY_ROLE;
    constructor(public payload: FamilyPayload) { }
}

export class ClearFamilyMessageAction implements Action {
    readonly type = CLEAR_FAMILY_MESSAGE;
}


export type FamilyActions =
    ListFamiliesAction
    | ListFamiliesSuccessAction
    | ListFamiliesFailureAction
    | AddNewFamilyAction
    | AddNewFamilySuccessAction
    | AddNewFamilyFailureAction
    | UpdateFamilyAction
    | UpdateFamilySuccessAction
    | UpdateFamilyFailureAction
    | LinkPersonFamilyAction
    | SetFamilyRoleAction
    | AcceptMemberFamilyAction
    | IgnoreMemberFamilyAction
    | RemoveMemberFamilyAction
    | ClearFamilyMessageAction;
