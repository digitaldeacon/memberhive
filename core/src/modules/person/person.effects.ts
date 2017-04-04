import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Database } from '@ngrx/db';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import * as collection from './person.actions';
import { Person } from './person.model';


@Injectable()
export class PersonEffects {

    /**
     * This effect makes use of the `startWith` operator to trigger
     * the effect immediately on startup.
     */
    @Effect()
    loadCollection$: Observable<Action> = this.actions$
        .ofType(collection.personActionTypes.GET)
        .startWith(new collection.GetAction())
        .switchMap(() => {
            /*this.db.query('books')
             .toArray()
             .map((books: Book[]) => new collection.LoadSuccessAction(books))
             .catch(error => of(new collection.LoadFailAction(error)))*/
            }
        );


    constructor(private actions$: Actions) { }
}