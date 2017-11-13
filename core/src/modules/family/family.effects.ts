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
import { Family } from './family.model';
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
            return this._http.get('family/new')
                .map((r: Family[]) => new actions.ListFamiliesSuccessAction(r))
                .catch((r: HttpErrorResponse) => of(new actions.ListFamiliesFailureAction(r)));
        });
}
