import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as actions from './person.actions';
import { Person } from './person.model';
import { HttpService } from '../../services/http.service';

@Injectable()
export class PersonEffects {
    constructor(private actions$: Actions,
                private http: HttpService) { }

    @Effect()
    getPeople$ = this.actions$
        .ofType(actions.LIST_PEOPLE)
        .map((action: actions.ListAction) => action.payload)
        .switchMap(() =>
            this.http.get('person/list')
            .map((r: Person[]) => new actions.ListSuccessAction(r))
        );

    @Effect()
    updatePerson$ = this.actions$
        .ofType(actions.UPDATE_PERSON)
        .map((action: actions.PersonUpdateAction) => action.payload)
        .switchMap((data: any) => this.http.post('person/update?id=' + data.uid, data)
                .map((r: Person) => new actions.PersonUpdateSuccessAction(r))
        );

    @Effect()
    createPerson$ = this.actions$
        .ofType(actions.CREATE_PERSON)
        .map((action: actions.PersonCreateAction) => action.payload)
        .switchMap((data: Person) => this.http.post('person/create', data)
            .map((r: Person) => new actions.PersonCreateSuccessAction(r))
        );
}
