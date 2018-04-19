import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { exhaustMap, skipWhile, takeWhile, map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import {
  AppState,
  getSelectedPerson,
  getInteractionsPerson,
  getTags,
  getPeopleWithFilter,
  getPeopleSysSettings,
  isAwaitingFormSubmit,
  Person,
  Interaction,
  Tag,
  GeoMarker,
  Utils,
  CalcGeoCodePayload,
  GetInteractionsPersonAction,
  ViewPersonAction,
  UpdatePersonAction,
  DeletePersonAction,
  SetTitleAction,
  ContextButton,
  SetContextButtonsAction,
  CalcPersonGeoAction,
  DeleteInteractionAction,
  AddInteractionAction,
  AwaitFormSubmitAction
} from '@memberhivex/core';

import { AvatarEditDialogComponent } from '../dialogs/avatar-edit.dialog';
import { PersonRelationsDialogComponent } from '../dialogs/person-relations.dialog';
import { MapDialogComponent } from '../dialogs/map/map.dialog';

import { ShoutService } from '../../common/shout.service';
import { DialogService } from '../../common/dialog.service';

import { isEqual } from 'lodash';

@Component({
  moduleId: 'mh-person',
  selector: 'mh-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonViewComponent implements OnInit, OnDestroy {
  private _alive: boolean = true;

  people: Array<Person>;
  peopleFiltered: Person[];
  person?: Person;
  person$: Observable<Person>;
  awaitsFormSubmit: boolean;

  interactions$: Observable<Interaction[]>;
  interactions: Array<Interaction>;

  tags$: Observable<Tag[]>;
  settings: any; // combines SystemSettings and PersonSettings
  hasMap: boolean = false;

  dialogRef: MatDialogRef<any>;

  constructor(
    private _store: Store<AppState>,
    private _router: Router,
    private _route: ActivatedRoute,
    private _shout: ShoutService,
    private _dialogSrv: DialogService,
    private _dialog: MatDialog
  ) {
    // Selects the current person by fragment param
    this.person$ = this._store.select(getSelectedPerson);
    // this.person$.subscribe((data: Person) => console.log('person updated:', data));
    // Fetches all Interactions associated with this person
    this.interactions$ = this._store.select(getInteractionsPerson);
    // Selects the tags by fragment param
    this.tags$ = this._store.select(getTags);

    this._store
      .select(isAwaitingFormSubmit)
      .pipe(takeWhile(() => this._alive))
      .subscribe((waiting: boolean) => (this.awaitsFormSubmit = waiting));

    // Load all people for the back and forth buttons
    this._store
      .select(getPeopleWithFilter)
      .pipe(takeWhile(() => this._alive))
      .subscribe((people: Person[]) => {
        this.people = people;
        this.peopleFiltered = people;
      });

    // Fetch the combined settings for people and system
    this._store
      .select(getPeopleSysSettings)
      .pipe(takeWhile(() => this._alive))
      .subscribe((data: any) => {
        this.settings = data;
      });
  }

  ngOnInit(): void {
    this._route.params
      .pipe(
        //skipWhile(() => this.awaitsFormSubmit), //TODO: skip navigation when form is touched
        map((params: Params) => {
          this._store.dispatch(new ViewPersonAction(params['id']));
          this._store.dispatch(new GetInteractionsPersonAction(params['id']));
        }),
        exhaustMap(() => this.person$),
        takeWhile(() => this._alive)
      )
      .subscribe((person: any) => {
        if (person) {
          this.person = person;
          this._store.dispatch(new SetTitleAction(this.person.fullName));
          this.hasMap = !Utils.objEmptyProperties(this.person.address, 'home', 'geocode');
        }
      });
    this._setContextMenu();
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  prevPerson(): void {
    let idx: number = this.peopleFiltered.findIndex((p: Person) => p.uid === this.person.uid);
    idx = idx > 0 ? idx - 1 : this.peopleFiltered.length - 1;
    if (this.peopleFiltered[idx]) {
      this.gotoPerson(this.peopleFiltered[idx].uid);
    }
  }

  nextPerson(): void {
    let idx: number = this.peopleFiltered.findIndex((p: Person) => p.uid === this.person.uid);
    idx = idx < this.peopleFiltered.length - 1 ? idx + 1 : 0;
    if (this.peopleFiltered[idx]) {
      this.gotoPerson(this.peopleFiltered[idx].uid);
    }
  }

  gotoPerson(uid: string): void {
    this._router.navigate(['/person/view', uid]);
  }

  savePerson(person: Person): void {
    person.uid = this.person.uid;
    this._store.dispatch(new UpdatePersonAction(person));
    this._calcGeoCodes(person);
    this._store.dispatch(new AwaitFormSubmitAction(false));
  }

  deletePerson(): void {
    this._dialogSrv
      .confirm('Deleting: ' + this.person.fullName, 'Are you sure you want to do this?')
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          this._store.dispatch(new DeletePersonAction(this.person));
          this._router.navigate(['/person']);
        }
      });
  }

  deleteInteraction(interactionId: number): void {
    this._store.dispatch(new DeleteInteractionAction(interactionId));
  }

  addInteraction(interaction: Interaction): void {
    this._store.dispatch(new AddInteractionAction(interaction));
  }

  openDlgRelationships(): void {
    this.dialogRef = this._dialog.open(PersonRelationsDialogComponent);
    this.dialogRef.afterClosed().subscribe((result: string) => {
      this.dialogRef = undefined;
    });
  }

  openDlgMap(): void {
    const config: MatDialogConfig = new MatDialogConfig();
    const personMarker: GeoMarker = {
      latlng: !Utils.objEmptyProperties(this.person.address, 'home', 'geocode')
        ? this.person.address.home.geocode
        : undefined,
      title: this.person.fullName,
      info: {
        title: this.person.fullName,
        address: this.person.address.home
      }
    };
    config.data = {
      context: 'person',
      markers: [personMarker],
      initMarker: personMarker,
      initMarkerToMap: true
    };
    this.dialogRef = this._dialog.open(MapDialogComponent, config);
    this.dialogRef.afterClosed().subscribe((result: string) => {
      this.dialogRef = undefined;
    });
  }

  openDlgAvatar(): void {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      context: 'person',
      id: this.person.uid,
      avatar: this.person.avatar
    };

    this.dialogRef = this._dialog.open(AvatarEditDialogComponent, config);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      this.dialogRef = undefined;
    });
  }

  createInteraction(): void {
    this._router.navigate(['/interaction/create']);
  }

  formChanged(): void {
    console.log("form changed. Don't naviagte away");
    this._store.dispatch(new AwaitFormSubmitAction(true));
  }

  private _calcGeoCodes(person: Person): void {
    const org: Person = this.person;
    let gcPayload: CalcGeoCodePayload;

    if (isEqual(org.address, person.address)) {
      return;
    }

    if (!Utils.objEmptyProperties(person.address, 'home', ['street', 'city', 'zip'])) {
      gcPayload = {
        person: person,
        apiKey: this.settings.googleApiKey
      };
      if (!Utils.objEmptyProperties(this.settings, 'googleApiKey')) {
        this._store.dispatch(new CalcPersonGeoAction(gcPayload));
      } else {
        this._shout.error('There is no Google API key present. Go to settings and set one.');
      }
    }
  }

  private _setContextMenu(): void {
    const buttons: ContextButton[] = [];
    buttons.push({
      icon: 'person_pin',
      link: '/person/map',
      title: 'PEOPLE MAP'
    });
    buttons.push({
      icon: 'person_add',
      link: '/person/create',
      title: 'ADD PERSON'
    });

    this._store.dispatch(new SetContextButtonsAction(buttons));
  }
}
