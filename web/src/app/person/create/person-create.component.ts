import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as app from '../../app.store';
import {
  TitleService,
  Person,
  Message,
  PersonCreateAction,
  ContextButton,
  SetContextButtonsAction,
  PersonClearMessageAction
} from 'mh-core';

import { ShoutService } from '../../common/shout.service';

@Component({
  selector: 'mh-person-create',
  templateUrl: './person-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonCreateComponent implements OnDestroy {
  private _alive: boolean = true;
  settings$: Observable<any>;
  people: Person[];

  constructor(titleService: TitleService,
              private _store: Store<app.AppState>,
              private _shout: ShoutService,
              private _router: Router) {
    titleService.setTitle('Create Person');
    this.settings$ = this._store.select(app.getPeopleSettings);
    this._store.select(app.getLastCreatedPersonId).takeWhile(() => this._alive)
        .distinctUntilChanged()
        .subscribe((uid: string) => {
          if (uid) {
            this._router.navigate(['/person/view', uid]);
          }
        });
    this._store.select(app.getMessage)
        .takeWhile(() => this._alive)
        .subscribe((message: Message) => {
          if (message) {
            this._shout.out(message.text, message.type);
            this._store.dispatch(new PersonClearMessageAction());
          }
        });
    this._setContextMenu();
  }

  savePerson(person: Person): void {
    this._store.dispatch(new PersonCreateAction(person));
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  private _setContextMenu(): void {
    let buttons: ContextButton[] = [];
    buttons.push({icon: 'people', link: '/person', title: 'LIST PEOPLE'});

    this._store.dispatch(new SetContextButtonsAction(buttons));
  }
}
