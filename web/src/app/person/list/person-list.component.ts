import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as app from '../../app.store';
import { Person, TitleService } from 'mh-core';

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonListComponent implements OnDestroy {
    private alive: boolean = true;

    people$: Observable<Person[]>;
    options: any = {};

    constructor(private _store: Store<app.AppState>,
                private _titleService: TitleService) {
        this._titleService.setTitle('People List');
        this.people$ = this._store.select(app.getPeople);
        this._store.select(app.getPeopleListSettings)
            .takeWhile(() => this.alive)
            .subscribe((data: any) => {
                this.options = data;
        });
    }

    display(key: string): boolean {
        return this.options.indexOf(key) >= 0;
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}
