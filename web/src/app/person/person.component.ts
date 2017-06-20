import { Component } from '@angular/core';
import { TitleService, SetContextButtonsAction, ContextButton } from 'mh-core';
import * as app from '../app.store';
import { Store } from '@ngrx/store';

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person',
    templateUrl: './person.component.html'
})
export class PersonComponent {
    constructor(titleService: TitleService,
                private _store: Store<app.AppState>) {
        titleService.changeModule('Person');
        this.setContextMenu();
    }

    setContextMenu(): void {
        let buttons: ContextButton[] = [];
        buttons.push({icon: 'person_add', link: '/person/create'});

        this._store.dispatch(new SetContextButtonsAction(buttons));
    }
}
