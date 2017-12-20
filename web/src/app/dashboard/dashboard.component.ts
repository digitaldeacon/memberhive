import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula';

import {
    AppState,
    getAuthPerson,
    getPeople,
    ContextButton,
    Person,
    SetContextButtonsAction,
    SetTitleAction
} from 'mh-core';


@Component({
    selector: 'mh-dashboard',
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnDestroy {

    private _alive: boolean = true;

    people$: Observable<Person[]>;
    currentUser$: Observable<Person>;

    showDropzone: boolean = false;
    now: string = new Date().toDateString();
    dashletsRight: Array<string>;
    dashletsLeft: Array<string>;

    constructor(private _dragulaService: DragulaService,
                private _store: Store<AppState>) {

        this.currentUser$ = this._store.select(getAuthPerson);
        this.people$ = this._store.select(getPeople);
        this.initDragServices();
        this.setContextMenu();
        this._store.dispatch(new SetTitleAction('Dashboard'));
    }

    setContextMenu(): void {
        this._store.dispatch(new SetContextButtonsAction([]));
    }

    ngOnDestroy(): void {
        this._dragulaService.destroy('dashlet');
        this._alive = false;
    }

    private initDragServices(): void {
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
    }
}
