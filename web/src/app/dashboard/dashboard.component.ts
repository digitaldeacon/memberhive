import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { TitleService, AuthService } from 'mh-core';
import { Person } from 'mh-core';

import * as app from '../app.store';

@Component({
    moduleId: 'mh-dashboard',
    selector: 'mh-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    people$: Observable<Person[]>;
    currentUser: Person;
    persons: Array<Person>;

    constructor(titleService: TitleService,
                private _auth: AuthService,
                private _store: Store<app.AppState>) {
        titleService.setTitle(new Date().toDateString());
        this.currentUser = this._auth.getCurrentUser(); // TODO: read from store
        this.people$ = this._store.select(app.getPeople);
    }
}
