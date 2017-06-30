import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { Effect, Actions, toPayload } from '@ngrx/effects';
import * as actions from './person.actions';
import { Person, CalcGeoCodePayload, PersonAddress } from './person.model';
import { HttpService } from '../../services/http.service';
import { GeocodeService } from '../../services/geocode.service';
import { GeoCodes } from '../../common/common.model';
import { Utils } from '../../common/common.utils';

@Injectable()
export class PersonEffects {
    constructor(private actions$: Actions,
                private http: HttpService,
                private _geoCoder: GeocodeService) {
    }

    @Effect()
    getPeople$ = this.actions$
        .ofType(actions.LIST_PEOPLE)
        .map((action: actions.ListAction) => action.payload)
        .switchMap(() =>
            this.http.get('person/list')
                .map((r: Person[]) => new actions.ListSuccessAction(r))
                .catch((r: any) => of(new actions.ListFailureAction(r)))
        );

    @Effect()
    updatePerson$ = this.actions$
        .ofType(actions.UPDATE_PERSON)
        .map((action: actions.PersonUpdateAction) => action.payload)
        .switchMap((data: any) => this.http.post('person/update?id=' + data.uid, data)
            .map((r: Person) => new actions.PersonUpdateSuccessAction(r))
            .catch((r: any) => of(new actions.PersonUpdateFailureAction(r)))
        );

    @Effect()
    createPerson$ = this.actions$
        .ofType(actions.CREATE_PERSON)
        .map((action: actions.PersonCreateAction) => action.payload)
        .switchMap((data: Person) => this.http.post('person/create', data)
            .map((r: Person) => new actions.PersonCreateSuccessAction(r))
            .catch((r: any) => of(new actions.PersonCreateFailureAction(r)))
        );

    @Effect()
    deletePerson$ = this.actions$
        .ofType(actions.DELETE_PERSON)
        .map((action: actions.PersonDeleteAction) => action.payload)
        .switchMap((data: Person) => this.http.post('person/delete?id=' + data.uid, data)
            .map((r: any) => new actions.PersonDeleteSuccessAction(r))
            .catch((r: any) => of(new actions.PersonDeleteFailureAction(r)))
        );

    @Effect()
    calcPersonGeo$ = this.actions$
        .ofType(actions.CALC_PERSON_GEO)
        .map(toPayload)
        .switchMap((payload: CalcGeoCodePayload) => {
            let adr: string, key: string, url: string;
            let address: PersonAddress = payload.person.address;
            let response: GeoCodes;

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
                .catch((error: any) => of(new actions.PersonCalcGeoFailureAction(error)));
        });
}
