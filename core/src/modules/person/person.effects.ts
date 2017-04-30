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

import * as actions from './person.actions';
import { Person } from './person.model';
import { HttpService } from "../../services/http.service";

@Injectable()
export class PersonEffects {

    /**
     * This effect makes use of the `startWith` operator to trigger
     * the effect immediately on startup.
     */
    @Effect()
    getPeople$: Observable<Action> = this.actions$
        .ofType(actions.personActionTypes.LIST)
        .startWith(new actions.ListAction(toPayload))
        .switchMap(() =>
            this.http.get('person/list')
            .map((r: Person[]) => new actions.ListSuccessAction(r))
        );
    @Effect()
    updatePerson$: Observable<Action> = this.actions$
        .ofType(actions.personActionTypes.UPDATE)
        .map((action: actions.PersonUpdateAction) => action.payload)
        .switchMap((data: any) => this.http.post('person/update?id=' + data.uid, data)
                .map((r: Person) => new actions.PersonUpdateSuccessAction(r))
        );

    constructor(private actions$: Actions,
                private http: HttpService) { }
}
