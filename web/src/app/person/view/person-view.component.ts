import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as app from '../../app.store';
import {
    Person,
    Interaction,
    Message,
    GeoMarker,
    CalcGeoCodePayload,
    TitleService,
    GetInteractionsPersonAction,
    PersonViewAction,
    PersonUpdateAction,
    PersonDeleteAction,
    PersonClearMessageAction,
    PersonCalcGeoAction,
    ListInteractionsAction
} from 'mh-core';

import { AvatarEditDialogComponent } from '../dialogs/avatar-edit.dialog';
import { PersonRelationsDialogComponent } from '../dialogs/person-relations.dialog';
import { MapDialogComponent } from '../dialogs/map/map.dialog';

import { ShoutService } from '../../common/shout.service';

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-view',
    templateUrl: './person-view.component.html',
    styleUrls: ['./person-view.component.scss']
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonViewComponent implements OnInit, OnDestroy {
    private _alive: boolean = true;
    interactions: Array<Interaction>;
    people: Array<Person>;
    person?: Person;
    person$: Observable<Person>;
    interactions$: Observable<Interaction[]>;
    settings: any; // combines SystemSettings and PersonSettings
    hasMap: boolean = false;
    userUid: string;

    dialogRef: MdDialogRef<any>;

    constructor(private _titleService: TitleService,
                private _store: Store<app.AppState>,
                private _router: Router,
                private _route: ActivatedRoute,
                private _shout: ShoutService,
                private _dialog: MdDialog) {

        this._store.select(app.getPeople)
            .takeWhile(() => this._alive)
            .subscribe((people: Person[]) => this.people = people);
        this._store.select(app.getAuthPersonId)
            .takeWhile(() => this._alive)
            .subscribe((uid: string) => this.userUid = uid);
        this.person$ = this._store.select(app.getSelectedPerson);
        this.interactions$ = this._store.select(app.getInteractionsPerson);
        // this.interactions$.takeWhile(() => this._alive).subscribe(v => console.log('Person interactions', v));
        this._store.select(app.getPeopleSysSettings).takeWhile(() => this._alive)
            .subscribe((data: any) => {
                this.settings = data;
            });

        this._store.select(app.getMessage)
            .takeWhile(() => this._alive)
            .subscribe((message: Message) => {
                if (message) {
                    this._shout.out(message.text, message.type)
                    .afterDismissed()
                     .take(1)
                     .subscribe(() => this._store.dispatch(new PersonClearMessageAction()));
                }
        });
    }

    ngOnInit(): void {
        this._route.params
            .map((params: Params) => {
                this._store.dispatch(new PersonViewAction(params['id']));
                this._store.dispatch(new GetInteractionsPersonAction(params['id']));
            })
            .mergeMap(() => this.person$)
            .subscribe((person: any) => {
                if (person) {
                    this.person = person;
                    this._titleService.setTitle(this.person.fullName);
                    if (person.address.hasOwnProperty('home') && person.address.home.hasOwnProperty('geocode')) {
                       this.hasMap = person.address.hasOwnProperty('home') && Object.keys(person.address.home.geocode).length > 0;
                    }
                }
            });
    }
    ngOnDestroy(): void {
        this._alive = false;
    }

    prevPerson(): void {
        let idx: number = this.people.findIndex((p: Person) => p.uid === this.person.uid);
        idx = (idx > 0) ? idx - 1 : this.people.length - 1;
        if (this.people[idx]) {
            this.gotoPerson(this.people[idx].uid);
        }
    }
    nextPerson(): void {
        let idx: number = this.people.findIndex((p: Person) => p.uid === this.person.uid);
        idx = (idx < this.people.length - 1) ? idx + 1  : 0;
        if (this.people[idx]) {
            this.gotoPerson(this.people[idx].uid);
        }
    }

    gotoPerson(uid: string): void {
        this._router.navigate(['/person/view', uid]);
    }

    savePerson(person: Person): void {
        let origin: Person = this.person;
        let gcPayload: CalcGeoCodePayload;

        person.uid = this.person.uid;
        this._store.dispatch(new PersonUpdateAction(person));
        this._calcGeoCodes(person);
    }

    deletePerson(person: Person): void {
        this._store.dispatch(new PersonDeleteAction(this.person));
    }

    openDlgRelationships(): void {
        this.dialogRef = this._dialog.open(PersonRelationsDialogComponent);
        this.dialogRef.afterClosed().subscribe((result: string) => {
            this.dialogRef = undefined;
        });
    }

    openDlgMap(): void {
        if (!this.person.address.hasOwnProperty('home'))
            return;

        const config: MdDialogConfig = new MdDialogConfig();
        const personMarker: GeoMarker = {
            latlng: this.person.address.home.geocode,
            title: this.person.fullName,
            info: {
                title: this.person.fullName,
                address: this.person.address.home
            }
        };
        config.data = {
            context: 'person',
            markers: [ personMarker ],
            initMarker: personMarker,
            initMarkerToMap: true
        };
        this.dialogRef = this._dialog.open(MapDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: string) => {
            this.dialogRef = undefined;
        });
    }

    openDlgAvatar(): void {
        const config: MdDialogConfig = new MdDialogConfig();
        config.data = {
            context: 'person',
            id: this.person.uid,
            avatar: this.person.avatar
        };

        this.dialogRef = this._dialog.open(AvatarEditDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
                this.person = result;
            }
            this.dialogRef = undefined;
        });
    }

    createInteraction(): void {
        // this._interactionService.init(this.person);
        // this._interactionService.setLastRoute(this._router.url);
        this._router.navigate(['/interaction/create']);
    }

    private _calcGeoCodes(person: Person): void {
        if (person.address.hasOwnProperty('home'))
            return;

        let gcPayload: CalcGeoCodePayload;
        if ((person.address.home.street && person.address.home.street !== '') &&
            (person.address.home.city && person.address.home.city !== '') &&
            (person.address.home.zip && person.address.home.zip !== '')) {
            gcPayload = {
                person: person,
                apiKey: this.settings.googleApiKey
            };
            if (this.settings.googleApiKey !== undefined) {
                this._store.dispatch(new PersonCalcGeoAction(gcPayload));
            } else {
                this._shout.error('The API key is not yet saved. Go to settings and set a church address!');
            }
        }
    }
}
