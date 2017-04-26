import { Component, ChangeDetectionStrategy } from '@angular/core';
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

export class PersonListComponent {
    people$: Observable<Person[]>;
    people: any[] = [];
    options: any = {};

    constructor(private _store: Store<app.AppState>,
                private _titleService: TitleService) {
        this._titleService.setTitle('Person List');
        this.people$ = this._store.select(app.getPeople);
            /*.subscribe((o: any) => {
            this.people = Object.keys(o);
        });*/
        this.options = {
            display: ['birthday', 'email']
        };
    }

    display(key: string): boolean {
        return this.options.display.indexOf(key) >= 0;
    }
}
