import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import {
    AppState,
    getPeople, getPeopleListSettings, getFamilies,
    Person, Family,
    ContextButton, SetContextButtonsAction,
    SetTitleAction
} from 'mh-core';

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
    families: Family[];
    options: any = {};

    constructor(private _store: Store<AppState>) {
        this.people$ = this._store.select(getPeople);
        this._store.select(getFamilies)
            .takeWhile(() => this._alive)
            .subscribe((families: Family[]) => this.families = families);
        this._store.select(getPeopleListSettings)
            .takeWhile(() => this._alive)
            .subscribe((data: any) => {
                this.options = data;
        });
        this._setContextMenu();
        this._store.dispatch(new SetTitleAction('List People'));
    }

    display(key: string): boolean {
        return this.options.indexOf(key) >= 0;
    }

    ngOnDestroy(): void {
        this._alive = false;
    }

    familyName(id: number): string {
        return this.families.find((f: Family) => f.id === id).name;
    }

    private _setContextMenu(): void {
        const buttons: ContextButton[] = [];
        buttons.push({icon: 'person_pin', link: '/person/map', title: 'PEOPLE MAP'});
        buttons.push({icon: 'person_add', link: '/person/create', title: 'ADD PERSON'});

        this._store.dispatch(new SetContextButtonsAction(buttons));
    }
}
