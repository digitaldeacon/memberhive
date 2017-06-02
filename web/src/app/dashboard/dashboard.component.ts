import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { TitleService } from 'mh-core';
import { Person } from 'mh-core';

import * as app from '../app.store';

@Component({
    selector: 'mh-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    showDropzone: boolean = false;
    people$: Observable<Person[]>;
    currentUser$: Observable<Person>;
    now: string = new Date().toDateString();

    constructor(titleService: TitleService,
                dragulaService: DragulaService,
                private _store: Store<app.AppState>) {
        titleService.changeModule('Dashboard');
        titleService.setTitle('Dasboard');
        dragulaService.setOptions('dashlet', {
            moves: function (el, container, handle, sibling) {
                return handle.className.indexOf('handle') > -1;
            }
        });
        dragulaService.drag.subscribe((value) => {
            this.showDropzone = true;
        });
        dragulaService.dragend.subscribe((value) => {
            this.showDropzone = false;
        });
        this.currentUser$ = this._store.select(app.getAuthPerson);
        this.people$ = this._store.select(app.getPeople);
    }
}
