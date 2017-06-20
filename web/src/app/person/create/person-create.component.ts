import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as app from '../../app.store';
import {
  TitleService,
  Person,
  PersonCreateAction
} from 'mh-core';

@Component({
  selector: 'mh-person-create',
  templateUrl: './person-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonCreateComponent {
  settings$: Observable<any>;

  constructor(titleService: TitleService,
              private _store: Store<app.AppState>,
              private _router: Router) {
    titleService.setTitle('Create Person');
    this.settings$ = this._store.select(app.getPeopleSettings);
  }

  savePerson(person: Person): void {
    this._store.dispatch(new PersonCreateAction(person));
    // this._router.navigate(['/person/view', person.uid]);
  }
}
