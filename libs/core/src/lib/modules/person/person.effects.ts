import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, concatMap, switchMap } from 'rxjs/operators';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Person, CalcGeoCodePayload, PersonAddress, AvatarPayload } from './person.model';
import { GeocodeService } from '../../services/geocode.service';
import { GeoCodes } from '../../common/common.model';
import { Utils } from '../../common/common.utils';
import { HttpClient } from '@angular/common/http';

import {
  PeopleActionTypes,
  ListPeopleAction,
  ListPeopleSuccessAction,
  ListPeopleFailureAction,
  UpdatePersonAction,
  UpdatePersonSuccessAction,
  UpdatePersonFailureAction,
  CreatePersonAction,
  CreatePersonSuccessAction,
  CreatePersonFailureAction,
  DeletePersonAction,
  DeletePersonSuccessAction,
  DeletePersonFailureAction,
  CalcPersonGeoAction,
  CalcPersonGeoFailureAction,
  UploadPersonAvatarAction,
  CalcPersonGeoSuccessAction,
} from './person.actions';
import { UpdateFamilySuccessAction } from '../family/family.actions';

@Injectable()
export class PersonEffects {
  constructor(private _actions$: Actions, private _http: HttpClient, private _geoCoder: GeocodeService) {}

  @Effect()
  getPeople$: Observable<Action> = this._actions$.pipe(
    ofType<ListPeopleAction>(PeopleActionTypes.LIST_PEOPLE),
    map((action) => action.payload),
    switchMap(() =>
      this._http.get('api/person/list').pipe(
        map((r: Person[]) => new ListPeopleSuccessAction(r)),
        catchError((r: HttpErrorResponse) => of(new ListPeopleFailureAction(r)))
      )
    )
  );

  @Effect()
  updatePerson$: Observable<Action> = this._actions$.pipe(
    ofType<UpdatePersonAction>(PeopleActionTypes.UPDATE_PERSON),
    map((action) => action.payload),
    mergeMap((data: Person) => {
      return this._http.post('api/person/update?id=' + data.uid, data).pipe(
        map((r: Person) => new UpdatePersonSuccessAction(r)),
        catchError((r: HttpErrorResponse) => of(new UpdatePersonFailureAction(r)))
      );
    })
  );

  @Effect()
  createPerson$: Observable<Action> = this._actions$.pipe(
    ofType<CreatePersonAction>(PeopleActionTypes.CREATE_PERSON),
    map((action) => action.payload),
    mergeMap((data: Person) =>
      this._http.post('api/person/create', data).pipe(
        switchMap((r: any) => {
          return [new CreatePersonSuccessAction(r.person), new UpdateFamilySuccessAction(r.family)];
        }),
        catchError((r: HttpErrorResponse) => of(new CreatePersonFailureAction(r)))
      )
    )
  );

  @Effect()
  uploadAvatar$: Observable<Action> = this._actions$.pipe(
    ofType<UploadPersonAvatarAction>(PeopleActionTypes.UPLOAD_PERSON_AVATAR),
    map((action) => action.payload),
    mergeMap((data: AvatarPayload) =>
      this._http.post('api/person/upload-avatar', data).pipe(
        map((r: Person) => new UpdatePersonSuccessAction(r)),
        catchError((r: HttpErrorResponse) => of(new UpdatePersonFailureAction(r)))
      )
    )
  );

  @Effect()
  deletePerson$: Observable<Action> = this._actions$.pipe(
    ofType<DeletePersonAction>(PeopleActionTypes.DELETE_PERSON),
    map((action) => action.payload),
    mergeMap((data: Person) =>
      this._http.post('api/person/delete?id=' + data.uid, data).pipe(
        map((r: any) => new DeletePersonSuccessAction(r)),
        catchError((r: HttpErrorResponse) => of(new DeletePersonFailureAction(r)))
      )
    )
  );

  @Effect()
  calcPersonGeo$: Observable<Action> = this._actions$.pipe(
    ofType<CalcPersonGeoAction>(PeopleActionTypes.CALC_PERSON_GEO),
    map((action) => action.payload),
    mergeMap((payload: CalcGeoCodePayload) => {
      const address: PersonAddress = payload.person.address;

      if (Utils.objEmptyProperties(address, 'home', ['city', 'street', 'zip'])) {
        return of();
      }

      this._geoCoder.apiKey = payload.apiKey;
      this._geoCoder.address = address.home;
      return this._geoCoder.calc().pipe(
        map((data: GeoCodes) => {
          payload.person.address.home.geocode = data;
          return new CalcPersonGeoSuccessAction(payload);
        }),
        catchError((error: HttpErrorResponse) => of(new CalcPersonGeoFailureAction(error)))
      );
    })
  );
}
