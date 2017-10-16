import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as app from '../../app.store';
import {
    Person,
    SystemSettings,
    GeoCodes,
    Utils,
    GeoMarker,
    ContextButton,
    SetContextButtonsAction
} from 'mh-core';

import { ShoutService } from '../../common/shout.service';
import { TitleService } from '../../common/title.service';

@Component({
    selector: 'mh-people-map',
    templateUrl: './people-map.component.html',
    styleUrls: ['./people-map.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PeopleMapComponent implements OnDestroy {
    private _alive: boolean = true;

    people: Person[];
    settings: SystemSettings;

    initMarker: GeoMarker;
    markers: GeoMarker[] = [];
    zoom: number = 11;

    constructor(private _store: Store<app.AppState>,
                private _shout: ShoutService,
                titleService: TitleService) {
        titleService.setTitle('People Map');
        this._store.select(app.getPeople).takeWhile(() => this._alive)
            .subscribe((people: Person[]) => {
                this.people = people.filter((p: Person) =>
                    !Utils.objEmptyProperties(p.address, 'home', 'geocode'));
                for (let person of this.people) {
                    let marker: GeoMarker;
                    marker = {
                        latlng: person.address.home.geocode,
                        title: person.fullName,
                        icon: 'assets/icons/ic_person_pin_' + person.gender + '_36px.png',
                        info: {
                            title: person.fullName,
                            address: person.address.home
                        }
                    };
                    this.markers.push(marker);
                }
            });
        this._store.select(app.getSysSettings)
            .takeWhile(() => this._alive)
            .subscribe((data: SystemSettings) => {
                this.settings = data;
                if (this.validate()) {
                    this.setInitMarker();
                } else {
                    this._shout.error('Church address is missing or incomplete. Go to settings to fix it');
                }
            });
        this._setContextMenu();
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
                address: this.settings.churchAddress
            }
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
        let buttons: ContextButton[] = [];
        buttons.push({icon: 'people', link: '/person', title: 'LIST PEOPLE'});
        buttons.push({icon: 'person_add', link: '/person/create', title: 'ADD PERSON'});

        this._store.dispatch(new SetContextButtonsAction(buttons));
    }
}
