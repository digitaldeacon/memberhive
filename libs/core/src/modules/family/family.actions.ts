import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Family, FamilyPayload } from './family.model';

export enum FamilyActionTypes {
  LIST_FAMILIES = '[Family] List Families',
  LIST_FAMILIES_SUCCESS = '[Family] List Success',
  LIST_FAMILIES_FAILURE = '[Family] List Failure',
  ADD_FAMILY = '[Family] Add new family',
  ADD_FAMILY_SUCCESS = '[Family] Add new family Success',
  ADD_FAMILY_FAILURE = '[Family] Add new Family Failure',
  UPDATE_FAMILY = '[Family] Update Family',
  UPDATE_FAMILY_SUCCESS = '[Family] Update Family Success',
  UPDATE_FAMILY_FAILURE = '[Family] Update Family Failure',
  LINK_PERSON_FAMILY = '[Family] Link person to family',
  SET_FAMILY_ROLE = '[Family] Set role in family',
  ACCEPT_MEMBER = '[Family] Accept suggested member',
  IGNORE_MEMBER = '[Family] Ignore suggested member',
  REMOVE_MEMBER = '[Family] Remove family member',
  CLEAR_FAMILY_MESSAGE = '[Family] Clear Message'
}

export class ListFamiliesAction implements Action {
  readonly type = FamilyActionTypes.LIST_FAMILIES;
  constructor(public payload: any) {}
}

export class ListFamiliesSuccessAction implements Action {
  readonly type = FamilyActionTypes.LIST_FAMILIES_SUCCESS;
  constructor(public payload: Family[]) {}
}

export class ListFamiliesFailureAction implements Action {
  readonly type = FamilyActionTypes.LIST_FAMILIES_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class AddNewFamilyAction implements Action {
  readonly type = FamilyActionTypes.ADD_FAMILY;
  constructor(public payload: Family) {}
}

export class AddNewFamilySuccessAction implements Action {
  readonly type = FamilyActionTypes.ADD_FAMILY_SUCCESS;
  constructor(public payload: Family) {}
}

export class AddNewFamilyFailureAction implements Action {
  readonly type = FamilyActionTypes.ADD_FAMILY_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class UpdateFamilyAction implements Action {
  readonly type = FamilyActionTypes.UPDATE_FAMILY;
  constructor(public payload: Family) {}
}

export class UpdateFamilySuccessAction implements Action {
  readonly type = FamilyActionTypes.UPDATE_FAMILY_SUCCESS;
  constructor(public payload: Family) {}
}

export class UpdateFamilyFailureAction implements Action {
  readonly type = FamilyActionTypes.UPDATE_FAMILY_FAILURE;
  constructor(public payload: HttpErrorResponse) {}
}

export class LinkPersonFamilyAction implements Action {
  readonly type = FamilyActionTypes.LINK_PERSON_FAMILY;
  constructor(public payload: FamilyPayload) {}
}

export class AcceptMemberFamilyAction implements Action {
  readonly type = FamilyActionTypes.ACCEPT_MEMBER;
  constructor(public payload: FamilyPayload) {}
}

export class IgnoreMemberFamilyAction implements Action {
  readonly type = FamilyActionTypes.IGNORE_MEMBER;
  constructor(public payload: FamilyPayload) {}
}

export class RemoveMemberFamilyAction implements Action {
  readonly type = FamilyActionTypes.REMOVE_MEMBER;
  constructor(public payload: FamilyPayload) {}
}

export class SetFamilyRoleAction implements Action {
  readonly type = FamilyActionTypes.SET_FAMILY_ROLE;
  constructor(public payload: FamilyPayload) {}
}

export class ClearFamilyMessageAction implements Action {
  readonly type = FamilyActionTypes.CLEAR_FAMILY_MESSAGE;
}

export type FamilyActions =
  | ListFamiliesAction
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
