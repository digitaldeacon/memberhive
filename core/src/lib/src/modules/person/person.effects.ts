import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Params, ActivatedRouteSnapshot } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
// import { AppState } from '../../store';

import { Effect, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

import * as actions from './person.actions';
import { Person, CalcGeoCodePayload, PersonAddress } from './person.model';
import { Family } from '../family/family.model';
import { HttpService } from '../../services/http.service';
import { GeocodeService } from '../../services/geocode.service';
import { GeoCodes } from '../../common/common.model';
import { Utils } from '../../common/common.utils';
import {HttpResponse} from "@angular/common/http";

@Injectable()
export class PersonEffects {
    // private _store: Store<app.AppState>
    constructor(private _actions$: Actions,
                private _http: HttpService,
                private _geoCoder: GeocodeService) {
    }

    @Effect()
    getPeople$ = this._actions$
        .ofType(actions.LIST_PEOPLE)
        .map((action: actions.ListPersonAction) => action.payload)
        .switchMap(() =>
            this._http.get('person/list')
                .map((r: Person[]) => new actions.ListPersonSuccessAction(r))
                .catch((r: HttpErrorResponse) => of(new actions.ListPersonFailureAction(r)))
        );
    /*getPeople$ = this.handleNavigation('dashboard', (r: ActivatedRouteSnapshot) => {
        return this._http.get('person/list')
            .map((r: Person[]) => new actions.ListSuccessAction(r))
            .catch((r: Response) => of(new actions.ListFailureAction(r)));
    })*/

    @Effect()
    updatePerson$ = this._actions$
        .ofType(actions.UPDATE_PERSON)
        .map((action: actions.UpdatePersonAction) => action.payload)
        .mergeMap((data: any) => this._http.post('person/update?id=' + data.uid, data)
            .map((r: Person) => new actions.UpdatePersonSuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.UpdatePersonFailureAction(r)))
        );

    @Effect()
    createPerson$ = this._actions$
        .ofType(actions.CREATE_PERSON)
        .map((action: actions.CreatePersonAction) => action.payload)
        .switchMap((data: Person) => this._http.post('person/create', data)
            .map((r: Person) => new actions.CreatePersonSuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.CreatePersonFailureAction(r)))
        );

    @Effect()
    deletePerson$ = this._actions$
        .ofType(actions.DELETE_PERSON)
        .map((action: actions.DeletePersonAction) => action.payload)
        .switchMap((data: Person) => this._http.post('person/delete?id=' + data.uid, data)
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

    @Effect()
    setPersonFamilyRole$ = this._actions$
        .ofType(actions.UPDATE_PERSON_FAMILY)
        .map((action: actions.UpdatePersonFamily) => action.payload)
        .mergeMap((fam: Family) => this._http.post('person/update-family?id=' + fam.selected, fam)
            .map((r: Person) => new actions.UpdatePersonFamilySuccessAction(r))
            .catch((r: HttpErrorResponse) => of(new actions.UpdatePersonFamilyFailureAction(r)))
        );

    /*private handleNavigation(segment: string, callback: (a: ActivatedRouteSnapshot, state: AppState) => Observable<any>) {
        const nav = this._actions$.ofType(ROUTER_NAVIGATION).
        map(firstSegment).
        filter(s => s.routeConfig.path === segment);

        return nav.withLatestFrom(this._store).switchMap(a => callback(a[0], a[1])).catch(e => {
            console.log('Network error', e);
            return of();
        });
    }*/
}

function firstSegment(r: RouterNavigationAction) {
    return r.payload.routerState.root.firstChild;
}