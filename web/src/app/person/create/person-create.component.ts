import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as app from '../../app.store';
import {
  Utils,
  TitleService,
  Person,
  PersonCreateAction,
  ContextButton,
  SetContextButtonsAction,
  PersonCalcGeoAction,
  CalcGeoCodePayload
} from 'mh-core';

@Component({
  selector: 'mh-person-create',
  templateUrl: './person-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonCreateComponent implements OnDestroy {
  private _alive: boolean = true;
  settings$: Observable<any>;
  googleApiKey: string;
  people: Person[];

  constructor(titleService: TitleService,
              private _store: Store<app.AppState>,
              private _router: Router) {
    titleService.setTitle('Create Person');
    this.settings$ = this._store.select(app.getPeopleSettings);
    this._store.select(app.getSysGoogleKey).takeWhile(() => this._alive)
        .subscribe((key: string) => this.googleApiKey = key);

    this._store.select(app.getLastCreatedPersonId).takeWhile(() => this._alive)
        .distinctUntilChanged()
        .subscribe((uid: string) => {
          if (uid) {
            this._router.navigate(['/person/view', uid]);
          }
        });
    this._setContextMenu();
  }

  savePerson(person: Person): void {
    this._store.dispatch(new PersonCreateAction(person));
    // Cannot calculate here as we need the uid for the update action underneath
    // we hide the right part of the form in create mode (for now)
    // this._calcGeoCodes(person);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  private _calcGeoCodes(person: Person): void {
    let gcPayload: CalcGeoCodePayload;
    if (!Utils.objEmptyProperties(person.address, 'home', ['street', 'city', 'zip'])) {
      gcPayload = {
        person: person,
        apiKey: this.googleApiKey
      };
      this._store.dispatch(new PersonCalcGeoAction(gcPayload));
    }
  }

  private _setContextMenu(): void {
    let buttons: ContextButton[] = [];
    buttons.push({icon: 'people', link: '/person', title: 'LIST PEOPLE'});

    this._store.dispatch(new SetContextButtonsAction(buttons));
  }
}
