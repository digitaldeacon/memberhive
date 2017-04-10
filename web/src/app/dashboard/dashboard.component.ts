import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { TitleService } from '../common/title.service';
import { AuthService } from '../common/auth/auth.service';
import { Person } from '../person/person';

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
        const currentDate: Date = new Date();
        titleService.setTitle(currentDate.toDateString());
        this.currentUser = this._auth.getCurrentUser(); // TODO: read from store
        this.people$ = this._store.select(app.getPeople);
    }
}
