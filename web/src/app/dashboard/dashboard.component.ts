import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { TitleService } from 'mh-core';
import { Person } from 'mh-core';

import * as app from '../app.store';

@Component({
    moduleId: 'mh-dashboard',
    selector: 'mh-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    people$: Observable<Person[]>;
    currentUser$: Observable<Person>;
    now: string = new Date().toDateString();

    constructor(titleService: TitleService,
                private _store: Store<app.AppState>) {
        titleService.changeModule('Dashboard');
        titleService.setTitle('Dasboard');
        this.currentUser$ = this._store.select(app.getAuthPerson);
        this.people$ = this._store.select(app.getPeople);
    }
}
