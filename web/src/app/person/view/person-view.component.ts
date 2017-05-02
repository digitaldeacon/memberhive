import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import * as app from '../../app.store';
import {
    Person,
    TitleService,
    personActionTypes,
    PersonViewAction} from 'mh-core';

import { AvatarEditDialogComponent } from '../dialogs/avatar-edit.dialog';
import { PersonRelationsDialogComponent } from '../dialogs/person-relations.dialog';

import { Interaction } from '../../interaction/interaction';
import { InteractionCreateDialogComponent } from '../../interaction/dialogs/interaction-create.dialog';

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-view',
    templateUrl: './person-view.component.html',
    styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit, OnDestroy {
    interactions: Array<Interaction>;
    people: Array<Person>;
    person?: Person;
    subscription: Subscription;
    dialogRef: MdDialogRef<any>;

    constructor(private _store: Store<app.AppState>,
                private _titleService: TitleService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _dialog: MdDialog) {
        this.subscription = this._store.select(app.getPeople)
            .subscribe((people: Person[]) => this.people = people);
    }

    ngOnInit(): void {
        this._route.params
            .map((params: Params) =>
                this._store.dispatch({type: personActionTypes.VIEW, payload: params['id']}))
            .switchMap((p: any) => this._store.select(app.getSelectedPerson))
            .subscribe((person: Person) => {
                this.person = person;
                this._titleService.setTitle(this.person.fullName);
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    prevPerson(): void {
        let idx: number = this.people.findIndex((p: Person) => p.uid === this.person.uid);
        idx = (idx > 0) ? idx - 1 : this.people.length - 1;
        if (this.people[idx]) {
            this._router.navigate(['/person/view', this.people[idx].uid]);
        }
    }

    nextPerson(): void {
        let idx: number = this.people.findIndex((p: Person) => p.uid === this.person.uid);
        idx = (idx < this.people.length - 1) ? idx + 1  : 0;
        if (this.people[idx]) {
            this._router.navigate(['/person/view', this.people[idx].uid]);
        }
    }

    savePerson(person: Person) {
        person.uid = this.person.uid;
        this._store.dispatch({type: personActionTypes.UPDATE, payload: person});
    }

    openDlgRelationships(): void {
        this.dialogRef = this._dialog.open(PersonRelationsDialogComponent);

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

    openDlgInteractions(): void {
        const config: MdDialogConfig = new MdDialogConfig();
        config.data = {
            id: this.person.uid
        };

        this.dialogRef = this._dialog.open(InteractionCreateDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: any) => {
            if (result instanceof Interaction) {
                this.interactions.unshift(result);
            }
            this.dialogRef = undefined;
        });
    }

    createInteraction(): void {
        // this._interactionService.init(this.person);
        // this._interactionService.setLastRoute(this._router.url);
        // this._router.navigate(['/interaction/create']);
    }
}
