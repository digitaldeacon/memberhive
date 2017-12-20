import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { Effect, Actions } from '@ngrx/effects';

import * as actions from './person.actions';
import { Person, CalcGeoCodePayload, PersonAddress } from './person.model';
import { GeocodeService } from '../../services/geocode.service';
import { GeoCodes } from '../../common/common.model';
import { Utils } from '../../common/common.utils';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PersonEffects {
    constructor(private _actions$: Actions,
                private _http: HttpClient,
                private _geoCoder: GeocodeService) {
    }

    @Effect()
    getPeople$ = this._actions$
        .ofType(actions.LIST_PEOPLE)
        .map((action: actions.ListPeopleAction) => action.payload)
        .switchMap(() =>
            this._http.get('api/person/list')
                .map((r: Person[]) => new actions.ListPeolpeSuccessAction(r))
                .catch((r: HttpErrorResponse) => of(new actions.ListPeolpeFailureAction(r)))
        );

    @Effect()
    updatePerson$ = this._actions$
        .ofType(actions.UPDATE_PERSON)
        .map((action: actions.UpdatePersonAction) => action.payload)
        .mergeMap((data: any) => this._http.post('api/person/update?id=' + data.uid, data)
            .map((r: Person) => new actions.UpdatePersonSuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.UpdatePersonFailureAction(r)))
        );

    @Effect()
    createPerson$ = this._actions$
        .ofType(actions.CREATE_PERSON)
        .map((action: actions.CreatePersonAction) => action.payload)
        .switchMap((data: Person) => this._http.post('api/person/create', data)
            .map((r: Person) => new actions.CreatePersonSuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.CreatePersonFailureAction(r)))
        );

    @Effect()
    deletePerson$ = this._actions$
        .ofType(actions.DELETE_PERSON)
        .map((action: actions.DeletePersonAction) => action.payload)
        .switchMap((data: Person) => this._http.post('api/person/delete?id=' + data.uid, data)
            .map((r: any) => new actions.DeletePersonSuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.DeletePersonFailureAction(r)))
        );

    @Effect()
    calcPersonGeo$ = this._actions$
        .ofType<actions.CalcPersonGeoAction>(actions.CALC_PERSON_GEO)
        .map(action => action.payload)
        .switchMap((payload: CalcGeoCodePayload) => {
            let address: PersonAddress = payload.person.address;

            if (Utils.objEmptyProperties(address, 'home', ['city', 'street', 'zip'])) {
                return empty();
            }

            this._geoCoder.apiKey = payload.apiKey;
            this._geoCoder.address = address.home;
            return this._geoCoder.calc()
                .map((data: GeoCodes) => {
                    payload.person.address.home.geocode = data;
                    return new actions.UpdatePersonAction(payload.person);
                })
                .catch((error: HttpErrorResponse) => of(new actions.CalcPersonGeoFailureAction(error)));
        });
}
