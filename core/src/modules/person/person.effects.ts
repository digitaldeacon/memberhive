import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

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
import { HttpService } from '../../services/http.service';
import { GeocodeService } from '../../services/geocode.service';
import { GeoCodes } from '../../common/common.model';
import { Utils } from '../../common/common.utils';

@Injectable()
export class PersonEffects {
    constructor(private _actions$: Actions,
                private _http: HttpService,
                private _geoCoder: GeocodeService) {
    }

    @Effect()
    getPeople$ = this._actions$
        .ofType(actions.LIST_PEOPLE)
        .map((action: actions.ListAction) => action.payload)
        .switchMap(() =>
            this._http.get('person/list')
                .map((r: Person[]) => new actions.ListSuccessAction(r))
                .catch((r: Response) => of(new actions.ListFailureAction(r)))
        );

    @Effect()
    updatePerson$ = this._actions$
        .ofType(actions.UPDATE_PERSON)
        .map((action: actions.PersonUpdateAction) => action.payload)
        .mergeMap((data: any) => this._http.post('person/update?id=' + data.uid, data)
            .map((r: Person) => new actions.PersonUpdateSuccessAction(r))
            .catch((r: Response) => of(new actions.PersonUpdateFailureAction(r)))
        );

    @Effect()
    createPerson$ = this._actions$
        .ofType(actions.CREATE_PERSON)
        .map((action: actions.PersonCreateAction) => action.payload)
        .switchMap((data: Person) => this._http.post('person/create', data)
            .map((r: Person) => new actions.PersonCreateSuccessAction(r))
            .catch((r: any) => of(new actions.PersonCreateFailureAction(r)))
        );

    @Effect()
    deletePerson$ = this._actions$
        .ofType(actions.DELETE_PERSON)
        .map((action: actions.PersonDeleteAction) => action.payload)
        .switchMap((data: Person) => this._http.post('person/delete?id=' + data.uid, data)
            .map((r: any) => new actions.PersonDeleteSuccessAction(r))
            .catch((r: Response) => of(new actions.PersonDeleteFailureAction(r)))
        );

    @Effect()
    calcPersonGeo$ = this._actions$
        .ofType<actions.PersonCalcGeoAction>(actions.CALC_PERSON_GEO)
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
                    return new actions.PersonUpdateAction(payload.person);
                })
                .catch((error: Response) => of(new actions.PersonCalcGeoFailureAction(error)));
        });
}
