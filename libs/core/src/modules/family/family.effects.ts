import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/toArray";
import "rxjs/add/observable/of";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { Effect, Actions } from "@ngrx/effects";
import * as actions from "./family.actions";
import { Family, FamilyPayload } from "./family.model";

@Injectable()
export class FamilyEffects {
  constructor(private _actions$: Actions, private _http: HttpClient) {}

  @Effect()
  listFamilies = this._actions$
    .ofType(actions.FamilyActionTypes.LIST_FAMILIES)
    .map((action: actions.ListFamiliesAction) => action.payload)
    .switchMap((data: any) => {
      return this._http
        .get("api/family/list")
        .map((r: Family[]) => new actions.ListFamiliesSuccessAction(r))
        .catch((r: HttpErrorResponse) =>
          of(new actions.ListFamiliesFailureAction(r))
        );
    });

  @Effect()
  addNewFamily = this._actions$
    .ofType(actions.FamilyActionTypes.ADD_FAMILY)
    .map((action: actions.AddNewFamilyAction) => action.payload)
    .switchMap((data: Family) => {
      return this._http
        .post("api/family/new", data)
        .mergeMap((r: Family) => {
          return [new actions.AddNewFamilySuccessAction(r)];
        })
        .catch((r: HttpErrorResponse) =>
          of(new actions.AddNewFamilyFailureAction(r))
        );
    });

  @Effect()
  updateFamily$ = this._actions$
    .ofType(actions.FamilyActionTypes.UPDATE_FAMILY)
    .map((action: actions.UpdateFamilyAction) => action.payload)
    .mergeMap((payload: Family) =>
      this._http
        .post("api/family/update?id=" + payload.id, payload)
        .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
        .catch((r: HttpErrorResponse) =>
          of(new actions.UpdateFamilyFailureAction(r))
        )
    );

  @Effect()
  setFamilyRole$ = this._actions$
    .ofType(actions.FamilyActionTypes.SET_FAMILY_ROLE)
    .map((action: actions.SetFamilyRoleAction) => action.payload)
    .mergeMap((payload: FamilyPayload) =>
      this._http
        .post("api/family/set-role?id=" + payload.member, payload)
        .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
        .catch((r: HttpErrorResponse) =>
          of(new actions.UpdateFamilyFailureAction(r))
        )
    );

  @Effect()
  acceptFamilyMember$ = this._actions$
    .ofType(actions.FamilyActionTypes.ACCEPT_MEMBER)
    .map((action: actions.AcceptMemberFamilyAction) => action.payload)
    .mergeMap((payload: FamilyPayload) =>
      this._http
        .post("api/family/accept?id=" + payload.member, payload)
        .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
        .catch((r: HttpErrorResponse) =>
          of(new actions.UpdateFamilyFailureAction(r))
        )
    );

  @Effect()
  ignoreSuggestedMember$ = this._actions$
    .ofType(actions.FamilyActionTypes.IGNORE_MEMBER)
    .map((action: actions.IgnoreMemberFamilyAction) => action.payload)
    .mergeMap((payload: FamilyPayload) =>
      this._http
        .post("api/family/ignore?id=" + payload.member, payload)
        .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
        .catch((r: HttpErrorResponse) =>
          of(new actions.UpdateFamilyFailureAction(r))
        )
    );

  @Effect()
  removeMemberFamily$ = this._actions$
    .ofType(actions.FamilyActionTypes.REMOVE_MEMBER)
    .map((action: actions.RemoveMemberFamilyAction) => action.payload)
    .mergeMap((payload: FamilyPayload) =>
      this._http
        .post("api/family/remove?id=" + payload.member, payload)
        .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
        .catch((r: HttpErrorResponse) =>
          of(new actions.UpdateFamilyFailureAction(r))
        )
    );

  @Effect()
  linkMemberFamily$ = this._actions$
    .ofType(actions.FamilyActionTypes.LINK_PERSON_FAMILY)
    .map((action: actions.LinkPersonFamilyAction) => action.payload)
    .mergeMap((payload: FamilyPayload) =>
      this._http
        .post("api/family/link?id=" + payload.member, payload)
        .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
        .catch((r: HttpErrorResponse) =>
          of(new actions.UpdateFamilyFailureAction(r))
        )
    );
}
