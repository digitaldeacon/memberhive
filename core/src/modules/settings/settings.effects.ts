import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import * as actions from './settings.actions';
import { SettingsPayload } from './settings.model';
import { SettingsState } from './settings.reducer';
import { HttpService } from '../../services/http.service';

@Injectable()
export class SettingsEffects {

    @Effect()
    get$: Observable<Action> = this.actions$
        .ofType(actions.LIST_SETTINGS)
        .do(() => actions.ListSettingAction)
        .switchMap(() =>
            this.http.get('settings/list') // TODO: add personId to fetch user settings too
                .map((r: any[]) => new actions.ListSettingSuccessAction(r))
                // .catch(() => of(actions.LIST_SETTINGS_FAILURE))
            // TODO: catch errors
        );

    @Effect()
    updateSetting$: Observable<Action> = this.actions$
        .ofType(actions.UPDATE_SETTINGS)
        .map((action: actions.UpdateSettingAction) => action.payload)
        .switchMap((payload: any) =>
            this.http.post('settings/update-or-create', payload)
            .map((r: any) => new actions.UpdateSettingSuccessAction(r))
            // TODO: catch errors
        );

    constructor(private actions$: Actions,
                private http: HttpService) { }
}
