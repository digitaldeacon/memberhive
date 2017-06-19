import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as app from '../../app.store';
import {
  TitleService,
  Person
} from 'mh-core';

@Component({
  selector: 'mh-person-create',
  templateUrl: './person-create.component.html'
})

export class PersonCreateComponent {
  settings$: Observable<any>;

  constructor(titleService: TitleService,
              private _store: Store<app.AppState>,) {
    titleService.setTitle('Create Person');
    this.settings$ = this._store.select(app.getPeopleSettings);
  }

  savePerson(person: Person): void {
    // this._store.dispatch(new PersonUpdateAction(person));
    console.log(person);
  }
}
