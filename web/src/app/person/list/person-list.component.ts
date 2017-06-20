import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as app from '../../app.store';
import { Person, TitleService, ContextButton, SetContextButtonsAction } from 'mh-core';

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonListComponent implements OnDestroy {
    private _alive: boolean = true;

    people$: Observable<Person[]>;
    options: any = {};

    constructor(private _store: Store<app.AppState>,
                titleService: TitleService) {
        titleService.setTitle('People List');
        this.people$ = this._store.select(app.getPeople);
        this._store.select(app.getPeopleListSettings)
            .takeWhile(() => this._alive)
            .subscribe((data: any) => {
                this.options = data;
        });
        this.setContextMenu();
    }

    display(key: string): boolean {
        return this.options.indexOf(key) >= 0;
    }

    setContextMenu(): void {
        let buttons: ContextButton[] = [];
        buttons.push({icon: 'person_add', link: '/person/create'});

        this._store.dispatch(new SetContextButtonsAction(buttons));
    }

    ngOnDestroy(): void {
        this._alive = false;
    }
}
