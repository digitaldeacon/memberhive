import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Effect, Actions } from '@ngrx/effects';
import * as actions from './family.actions';
import { Family, FamilyPayload } from './family.model';
import { HttpService } from '../../services/http.service';

@Injectable()
export class FamilyEffects {
    constructor(private _actions$: Actions,
                private _http: HttpService) {
    }

    @Effect()
    listFamilies = this._actions$
        .ofType(actions.LIST_FAMILIES)
        .map((action: actions.ListFamiliesAction) => action.payload)
        .switchMap((data: any) => {
            return this._http.get('family/list')
                .map((r: Family[]) => new actions.ListFamiliesSuccessAction(r))
                .catch((r: HttpErrorResponse) => of(new actions.ListFamiliesFailureAction(r)));
        });

    @Effect()
    addNewFamily = this._actions$
        .ofType(actions.ADD_FAMILY)
        .map((action: actions.AddNewFamilyAction) => action.payload)
        .switchMap((data: Family) => {
            return this._http.post('family/new', data)
                .map((r: Family) => new actions.AddNewFamilySuccessAction(r))
                .catch((r: HttpErrorResponse) => of(new actions.AddNewFamilyFailureAction(r)));
        });

    @Effect()
    updateFamily$ = this._actions$
        .ofType(actions.UPDATE_FAMILY)
        .map((action: actions.UpdateFamilyAction) => action.payload)
        .mergeMap((payload: FamilyPayload) => this._http.post('family/update?id=' + payload.member, payload)
            .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.UpdateFamilyFailureAction(r)))
        );

    @Effect()
    setFamilyRole$ = this._actions$
        .ofType(actions.SET_FAMILY_ROLE)
        .map((action: actions.SetFamilyRoleAction) => action.payload)
        .mergeMap((payload: FamilyPayload) => this._http.post('family/set-role?id=' + payload.member, payload)
            .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.UpdateFamilyFailureAction(r)))
        );

    @Effect()
    acceptFamilyMember$ = this._actions$
        .ofType(actions.ACCEPT_MEMBER)
        .map((action: actions.AcceptMemberFamilyAction) => action.payload)
        .mergeMap((payload: FamilyPayload) => this._http.post('family/accept?id=' + payload.member, payload)
            .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.UpdateFamilyFailureAction(r)))
        );

    @Effect()
    ignoreSuggestedMember$ = this._actions$
        .ofType(actions.IGNORE_MEMBER)
        .map((action: actions.IgnoreMemberFamilyAction) => action.payload)
        .mergeMap((payload: FamilyPayload) => this._http.post('family/ignore?id=' + payload.member, payload)
            .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.UpdateFamilyFailureAction(r)))
        );

    @Effect()
    removeMemberFamily$ = this._actions$
        .ofType(actions.REMOVE_MEMBER)
        .map((action: actions.RemoveMemberFamilyAction) => action.payload)
        .mergeMap((payload: FamilyPayload) => this._http.post('family/remove?id=' + payload.member, payload)
            .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.UpdateFamilyFailureAction(r)))
        );

    @Effect()
    linkMemberFamily$ = this._actions$
        .ofType(actions.LINK_PERSON_FAMILY)
        .map((action: actions.LinkPersonFamilyAction) => action.payload)
        .mergeMap((payload: FamilyPayload) => this._http.post('family/link?id=' + payload.member, payload)
            .map((r: Family) => new actions.UpdateFamilySuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.UpdateFamilyFailureAction(r)))
        );
}
