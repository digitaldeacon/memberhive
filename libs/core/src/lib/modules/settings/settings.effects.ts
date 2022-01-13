import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, switchMap, catchError, map, concatMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Filter } from '../../common/common.model';

import {
  SettingsActionTypes,
  ListSettingAction,
  ListSettingSuccessAction,
  ListSettingFailureAction,
  UpdateSettingAction,
  UpdateSettingSuccessAction,
  UpdateSettingFailureAction,
  SetTitleAction,
  SavePeopleFilterAction,
  DeletePeopleFilterAction,
  DeletePeopleFilterSuccessAction,
  SavePeopleFilterSuccessAction,
} from './settings.actions';
import { HttpService } from '../../services/http.service';
import { SettingsState } from './settings.reducer';

@Injectable()
export class SettingsEffects {
  @Effect()
  getSettings$: Observable<Action> = this.actions$.pipe(
    ofType(SettingsActionTypes.LIST_SETTINGS),
    tap(() => ListSettingAction),
    switchMap(() =>
      this.http
        .get('settings/list') // TODO: add personId to fetch user settings too
        .pipe(
          map((r: SettingsState) => new ListSettingSuccessAction(r)),
          catchError((r: any) => of(new ListSettingFailureAction(r)))
        )
    )
  );

  @Effect()
  upsertSettings$: Observable<Action> = this.actions$.pipe(
    ofType(SettingsActionTypes.UPDATE_SETTINGS),
    map((action: UpdateSettingAction) => action.payload),
    switchMap((payload: SettingsState) =>
      this.http.post('settings/upsert', payload).pipe(
        map((r: SettingsState) => new UpdateSettingSuccessAction(payload)),
        catchError((r: any) => of(new UpdateSettingFailureAction(r)))
      )
    )
  );

  @Effect()
  upsertPeopleFilterSetting$: Observable<Action> = this.actions$.pipe(
    ofType(SettingsActionTypes.SAVE_PEOPLE_FILTER),
    map((action: SavePeopleFilterAction) => action.payload),
    switchMap((payload: Filter) =>
      this.http.post('settings/upsert-people-filter', payload).pipe(
        map(() => new SavePeopleFilterSuccessAction(payload.term)),
        catchError((r: any) => of(new UpdateSettingFailureAction(r)))
      )
    )
  );

  @Effect()
  deletePeopleFilterSetting$: Observable<Action> = this.actions$.pipe(
    ofType(SettingsActionTypes.DELETE_PEOPLE_FILTER),
    map((action: DeletePeopleFilterAction) => action.payload),
    concatMap((payload: string) =>
      this.http.post('settings/delete-people-filter', { term: payload }).pipe(
        map(() => new DeletePeopleFilterSuccessAction(payload)),
        catchError((r: any) => of(new UpdateSettingFailureAction(r)))
      )
    )
  );

  @Effect({ dispatch: false })
  setTitle$: Observable<String> = this.actions$.pipe(
    ofType(SettingsActionTypes.SET_TITLE),
    map((action: SetTitleAction) => action.payload),
    tap((action: any) => this.browserTitle.setTitle(action + ' - Memberhive'))
  );

  constructor(private actions$: Actions, private http: HttpService, private browserTitle: Title) {}
}
