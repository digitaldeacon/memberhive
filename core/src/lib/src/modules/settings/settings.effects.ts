import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Title } from '@angular/platform-browser';

import * as actions from './settings.actions';
import { HttpService } from '../../services/http.service';
import { SettingsState } from './settings.reducer';

@Injectable()
export class SettingsEffects {

    @Effect()
    getSettings$: Observable<Action> = this.actions$
        .ofType(actions.LIST_SETTINGS)
        .do(() => actions.ListSettingAction)
        .switchMap(() =>
            this.http.get('settings/list') // TODO: add personId to fetch user settings too
                .map((r: SettingsState) => new actions.ListSettingSuccessAction(r))
                .catch((r: any) => of(new actions.ListSettingFailureAction(r)))
        );

    @Effect()
    updateSetting$: Observable<Action> = this.actions$
        .ofType(actions.UPDATE_SETTINGS)
        .map((action: actions.UpdateSettingAction) => action.payload)
        .switchMap((payload: SettingsState) => this.http.post('settings/update-or-create', payload)
                .map((r: SettingsState) => new actions.UpdateSettingSuccessAction(payload))
                .catch((r: any) => of(new actions.UpdateSettingFailureAction(r)))
        );

    @Effect({ dispatch: false })
    setTitle$: Observable<Action> = this.actions$
        .ofType(actions.SET_TITLE)
        .map((action: actions.SetTitleAction) => action.payload)
        .do((action: any) => this.browserTitle.setTitle(action + ' - Memberhive'));

    constructor(private actions$: Actions,
                private http: HttpService,
                private browserTitle: Title) { }
}
