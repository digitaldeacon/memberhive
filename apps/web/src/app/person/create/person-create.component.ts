import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { takeWhile, distinctUntilChanged } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import {
  AppState,
  getPeopleSettings,
  getTags,
  getSysGoogleKey,
  getLastCreatedPersonId,
  Utils,
  Tag,
  Family,
  Person,
  CreatePersonAction,
  ContextButton,
  SetContextButtonsAction,
  CalcPersonGeoAction,
  SetTitleAction,
  CalcGeoCodePayload,
  getFamilies,
  FamilyPayload
} from '@memberhivex/core';

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
  tags$: Observable<Tag[]>;
  families$: Observable<Family[]>;

  constructor(private _store: Store<AppState>, private _router: Router) {
    this.settings$ = this._store.select(getPeopleSettings);
    // Selects the tags by fragment param
    this.tags$ = this._store.select(getTags);
    this.families$ = this._store.select(getFamilies);
    this._store
      .select(getSysGoogleKey)
      .pipe(takeWhile(() => this._alive))
      .subscribe((key: string) => (this.googleApiKey = key));

    this._store
      .select(getLastCreatedPersonId)
      .pipe(
        takeWhile(() => this._alive),
        distinctUntilChanged()
      )
      .subscribe((uid: string) => {
        if (uid) {
          this._router.navigate(['/person/view', uid]);
        }
      });
    this._setContextMenu();
    this._store.dispatch(new SetTitleAction('Create Person'));
  }

  savePerson(person: Person): void {
    // TODO: check if the surname, name combination exists and warn via modal dialog
    this._store.dispatch(new CreatePersonAction(person));
    // Cannot calculate the Geocodes here as we need the uid for the update action underneath
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
      this._store.dispatch(new CalcPersonGeoAction(gcPayload));
    }
  }

  private _setContextMenu(): void {
    const buttons: ContextButton[] = [];
    buttons.push({ icon: 'people', link: '/person', title: 'LIST PEOPLE' });

    this._store.dispatch(new SetContextButtonsAction(buttons));
  }
}
