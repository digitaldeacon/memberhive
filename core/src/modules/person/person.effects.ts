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
import { Person } from './person.model';
import { HttpService } from '../../services/http.service';

@Injectable()
export class PersonEffects {
    constructor(private actions$: Actions,
                private http: HttpService) {
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
    calcPersonGeo$ = this.actions$
        .ofType(actions.CALC_PERSON_GEO)
        .map(toPayload)
        .switchMap((person: Person) => {
            let adr: string;
            const apiKey: string = localStorage.getItem('ggl_apiKey');

            if (!person.address.home.street &&
                !person.address.home.zip &&
                !person.address.home.city) {
                return empty();
            }

            adr = person.address.home.street ? person.address.home.street : '';
            adr += person.address.home.zip ? ', ' + person.address.home.zip : '';
            adr += person.address.home.city ? ' ' + person.address.home.city : '';
            return this.http.getRaw('https://maps.googleapis.com/maps/api/geocode/json?address=' + adr + '&key=' + apiKey)
                .map((res: any) => {
                    person.address.home.geocode = res.results[0].geometry.location;
                    return new actions.PersonCalcGeoSuccessAction(person);
                })
                .catch((error: any) => of(new actions.PersonCalcGeoFailureAction(error)));
        });
}
