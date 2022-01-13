import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

import {
  AppState,
  getPeopleWithFilter,
  getSysSettings,
  getFamilies,
  Person,
  Family,
  SystemSettings,
  SetTitleAction,
  Utils,
  GeoMarker,
  ContextButton,
  SetContextButtonsAction,
} from '@memberhivex/core';

import { ShoutService } from '../../common/shout.service';

@Component({
  selector: 'mh-people-map',
  templateUrl: './people-map.component.html',
  styleUrls: ['./people-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleMapComponent implements OnDestroy {
  private _alive: boolean = true;

  people: Person[];
  families: Family[];
  settings: SystemSettings;

  initMarker: GeoMarker;
  markers: GeoMarker[] = [];
  zoom: number = 11;

  constructor(private _store: Store<AppState>, private _shout: ShoutService) {
    this._store
      .select(getFamilies)
      .pipe(takeWhile(() => this._alive))
      .subscribe((families: Family[]) => {
        this.families = families;
      });
    this._store
      .select(getPeopleWithFilter)
      .pipe(takeWhile(() => this._alive))
      .subscribe((people: Person[]) => {
        this.markers = [];
        this.people = people.filter((p: Person) => !Utils.objEmptyProperties(p.address, 'home', 'geocode'));
        this.people.map((person: Person) => {
          const family = this.families.find((f: Family) => !!f.primary[person.uid]);
          let marker: GeoMarker;
          const familyPeople: Partial<Person>[] = [];
          if (family) {
            if (!this.markers.some((m: GeoMarker) => m.info.uid === family.id)) {
              Object.keys(family.primary).map((uid: string) => {
                const fp = this.people.find((p: Person) => p.uid === uid);
                if (fp) {
                  familyPeople.push({ fullName: fp.fullName, uid: fp.uid });
                }
              });
              marker = {
                latlng: person.address.home.geocode,
                title: family.name,
                icon: 'assets/icons/ic_family_pin_36px.png',
                info: {
                  title: family.name,
                  people: familyPeople,
                  address: person.address.home,
                },
              };
            }
          } else {
            marker = {
              latlng: person.address.home.geocode,
              title: person.fullName,
              icon: 'assets/icons/ic_person_pin_' + person.gender + '_36px.png',
              info: {
                title: person.fullName,
                address: person.address.home,
              },
            };
          }
          this.markers.push(marker);
        });
      });
    this._store
      .select(getSysSettings)
      .pipe(takeWhile(() => this._alive))
      .subscribe((data: SystemSettings) => {
        this.settings = data;
        if (this.validate()) {
          this.setInitMarker();
        } else {
          this._shout.error('Church address is missing or incomplete. Go to settings to fix it');
        }
      });
    this._setContextMenu();
    this._store.dispatch(new SetTitleAction('People Map'));
  }

  validate(): boolean {
    return this.settings.hasOwnProperty('churchAddress');
  }

  setInitMarker(): void {
    this.initMarker = {
      latlng: !Utils.objEmptyProperties(this.settings, 'churchAddress', 'geocode')
        ? this.settings.churchAddress.geocode
        : undefined,
      title: this.settings.churchName,
      // icon: 'assets/icons/blue-dot.png',
      info: {
        title: this.settings.churchName,
        address: this.settings.churchAddress,
      },
    };
    this.markers.push(this.initMarker);
  }

  empty(v: any): boolean {
    return !v || Object.keys(v).length === 0;
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  private _setContextMenu(): void {
    const buttons: ContextButton[] = [];
    buttons.push({ icon: 'people', link: '/person', title: 'LIST PEOPLE' });
    buttons.push({
      icon: 'person_add',
      link: '/person/create',
      title: 'ADD PERSON',
    });

    this._store.dispatch(new SetContextButtonsAction(buttons));
  }
}
