import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as collection from './settings.actions';
import { HttpService } from "../../services/http.service";

@Injectable()
export class SettingsEffects {

    /**
     * This effect makes use of the `startWith` operator to trigger
     * the effect immediately on startup.
     */
    @Effect()
    get$: Observable<Action> = this.actions$
        .ofType(collection.settingActionTypes.LIST)
        .startWith(new collection.ListSettingAction())
        .switchMap(() =>
            this.http.get('settings/list')
                .map((r: any[]) => new collection.ListSettingSuccessAction(r))
        );

    constructor(private actions$: Actions,
                private http: HttpService) { }
}
