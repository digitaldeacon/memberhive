import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import {
    AppState,
    getPeople, getPeopleListSettings, getFamilies,
    Person, Family, ListFamiliesAction, ListPersonAction,
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
    options: string[] = [];

    constructor(private _store: Store<AppState>) {
        this._store.dispatch(new ListPersonAction({}));
        this._store.dispatch(new ListFamiliesAction({}));
        this.people$ = this._store.select(getPeople);
        this._store.select(getFamilies)
            .takeWhile(() => this._alive)
            .subscribe((families: Family[]) => this.families = families);
        this._store.select(getPeopleListSettings)
            .takeWhile(() => this._alive)
            .subscribe((data: string[]) => {
                this.options = data;
        });
        this._setContextMenu();
        this._store.dispatch(new SetTitleAction('List Members'));
    }

    display(key: string): boolean {
        return this.options.indexOf(key) >= 0;
    }

    ngOnDestroy(): void {
        this._alive = false;
    }

    familyName(id: number): string {
        const fam: Family = this.families.find((f: Family) => !!f.primary[id]);
        return fam ? fam.name : '';
    }

    isFamilyMember(id: string): boolean {
        return this.families.some((f: Family) => !!f.primary[id]);
    }

    private _setContextMenu(): void {
        const buttons: ContextButton[] = [];
        buttons.push({icon: 'person_pin', link: '/person/map', title: 'PEOPLE MAP'});
        buttons.push({icon: 'person_add', link: '/person/create', title: 'ADD PERSON'});

        this._store.dispatch(new SetContextButtonsAction(buttons));
    }
}
