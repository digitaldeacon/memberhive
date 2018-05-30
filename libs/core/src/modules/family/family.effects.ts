import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { Observable ,  of } from 'rxjs';

import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  FamilyActionTypes,
  ListFamiliesAction,
  ListFamiliesSuccessAction,
  ListFamiliesFailureAction,
  AddNewFamilyAction,
  AddNewFamilySuccessAction,
  AddNewFamilyFailureAction,
  UpdateFamilyAction,
  UpdateFamilySuccessAction,
  UpdateFamilyFailureAction,
  SetFamilyRoleAction,
  AcceptMemberFamilyAction,
  IgnoreMemberFamilyAction,
  RemoveMemberFamilyAction,
  LinkPersonFamilyAction
} from './family.actions';
import { Family, FamilyPayload } from './family.model';

@Injectable()
export class FamilyEffects {
  constructor(private _actions$: Actions, private _http: HttpClient) {}

  @Effect()
  listFamilies = this._actions$.pipe(
    ofType<ListFamiliesAction>(FamilyActionTypes.LIST_FAMILIES),
    map((action: ListFamiliesAction) => action.payload),
    switchMap((data: any) => {
      return this._http
        .get('api/family/list')
        .pipe(
          map((r: Family[]) => new ListFamiliesSuccessAction(r)),
          catchError((r: HttpErrorResponse) => of(new ListFamiliesFailureAction(r)))
        );
    })
  );

  @Effect()
  addNewFamily = this._actions$.pipe(
    ofType<AddNewFamilyAction>(FamilyActionTypes.ADD_FAMILY),
    map((action: AddNewFamilyAction) => action.payload),
    switchMap((data: Family) => {
      return this._http.post('api/family/new', data).pipe(
        mergeMap((r: Family) => {
          return [new AddNewFamilySuccessAction(r)];
        }),
        catchError((r: HttpErrorResponse) => of(new AddNewFamilyFailureAction(r)))
      );
    })
  );

  @Effect()
  updateFamily$ = this._actions$.pipe(
    ofType<UpdateFamilyAction>(FamilyActionTypes.UPDATE_FAMILY),
    map((action: UpdateFamilyAction) => action.payload),
    mergeMap((payload: Family) =>
      this._http
        .post('api/family/update?id=' + payload.id, payload)
        .pipe(
          map((r: Family) => new UpdateFamilySuccessAction(r)),
          catchError((r: HttpErrorResponse) => of(new UpdateFamilyFailureAction(r)))
        )
    )
  );

  @Effect()
  setFamilyRole$ = this._actions$.pipe(
    ofType<SetFamilyRoleAction>(FamilyActionTypes.SET_FAMILY_ROLE),
    map((action: SetFamilyRoleAction) => action.payload),
    mergeMap((payload: FamilyPayload) =>
      this._http
        .post('api/family/set-role?id=' + payload.member, payload)
        .pipe(
          map((r: Family) => new UpdateFamilySuccessAction(r)),
          catchError((r: HttpErrorResponse) => of(new UpdateFamilyFailureAction(r)))
        )
    )
  );

  @Effect()
  acceptFamilyMember$ = this._actions$.pipe(
    ofType<AcceptMemberFamilyAction>(FamilyActionTypes.ACCEPT_MEMBER),
    map((action: AcceptMemberFamilyAction) => action.payload),
    mergeMap((payload: FamilyPayload) =>
      this._http
        .post('api/family/accept?id=' + payload.member, payload)
        .pipe(
          map((r: Family) => new UpdateFamilySuccessAction(r)),
          catchError((r: HttpErrorResponse) => of(new UpdateFamilyFailureAction(r)))
        )
    )
  );

  @Effect()
  ignoreSuggestedMember$ = this._actions$.pipe(
    ofType<IgnoreMemberFamilyAction>(FamilyActionTypes.IGNORE_MEMBER),
    map((action: IgnoreMemberFamilyAction) => action.payload),
    mergeMap((payload: FamilyPayload) =>
      this._http
        .post('api/family/ignore?id=' + payload.member, payload)
        .pipe(
          map((r: Family) => new UpdateFamilySuccessAction(r)),
          catchError((r: HttpErrorResponse) => of(new UpdateFamilyFailureAction(r)))
        )
    )
  );

  @Effect()
  removeMemberFamily$ = this._actions$.pipe(
    ofType<RemoveMemberFamilyAction>(FamilyActionTypes.REMOVE_MEMBER),
    map((action: RemoveMemberFamilyAction) => action.payload),
    mergeMap((payload: FamilyPayload) =>
      this._http
        .post('api/family/remove?id=' + payload.member, payload)
        .pipe(
          map((r: Family) => new UpdateFamilySuccessAction(r)),
          catchError((r: HttpErrorResponse) => of(new UpdateFamilyFailureAction(r)))
        )
    )
  );

  @Effect()
  linkMemberFamily$ = this._actions$.pipe(
    ofType<LinkPersonFamilyAction>(FamilyActionTypes.LINK_PERSON_FAMILY),
    map((action: LinkPersonFamilyAction) => action.payload),
    mergeMap((payload: FamilyPayload) =>
      this._http
        .post('api/family/link?id=' + payload.member, payload)
        .pipe(
          map((r: Family) => new UpdateFamilySuccessAction(r)),
          catchError((r: HttpErrorResponse) => of(new UpdateFamilyFailureAction(r)))
        )
    )
  );
}
