import { Component, OnDestroy } from '@angular/core';
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
    dashletsRight: Array<string>;
    dashletsLeft: Array<string>;

    constructor(titleService: TitleService,
                private _dragulaService: DragulaService,
                private _store: Store<app.AppState>) {
        titleService.changeModule('Dashboard');
        titleService.setTitle('Dasboard');
        this._dragulaService.setOptions('dashlet', {
            moves: function (el: any, container: any, handle: any): boolean {
                return handle.className.indexOf('handle') > -1;
            }
        });
        this._dragulaService.drag.subscribe((value: any) => {
            this.showDropzone = true;
        });
        this._dragulaService.dragend.subscribe((value: any) => {
            this.showDropzone = false;
        });
        this.currentUser$ = this._store.select(app.getAuthPerson);
        this.people$ = this._store.select(app.getPeople);
    }

    ngOnDestroy(): void {
        this._dragulaService.destroy('dashlet');
    }
}
