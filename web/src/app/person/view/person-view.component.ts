import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { InteractionService } from '../../common/interaction.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as app from '../../app.store';
import {
    Person,
    TitleService,
    PersonViewAction } from 'mh-core';

import { AvatarEditDialogComponent } from '../dialogs/avatar-edit.dialog';
import { PersonRelationsDialogComponent } from '../dialogs/person-relations.dialog';

import { Interaction } from '../../interaction/interaction';
// import { InteractionService } from '../../interaction/interaction.service';
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
    people$: Observable<Person[]>;
    person$: Observable<Person>;
    person: Person;
    dialogRef: MdDialogRef<any>;
    hasMorePeople: boolean = false;

    actionsSubscription: Subscription;

    constructor(private _store: Store<app.AppState>,
                private _titleService: TitleService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _interactionService: InteractionService,
                private _dialog: MdDialog) {

        this._store.select(app.getPeople)
            .subscribe((people: Person[]) => {
                    this.people = people;
                    this.person = this.people
                        .filter((person: Person) => person.uid === this._route.snapshot.params['id'])[0];
                }
            );
        /*this.actionsSubscription = this._route.params
            .map((params: Params) => new PersonViewAction(params['id']))
            .subscribe(this._store);
        this.person$ = this._store.select(app.getSelectedPerson);*/
    }

    ngOnInit(): void {

        /*this._route.params
            .switchMap((params: Params) => this._personService.getPerson(params['id']))
            .subscribe((person: Person) => {
                this.person = person;
                this._titleService.setTitle('Person: ' + person.fullName);
                this._interactionService.getInteractions(person.uid)
                    .subscribe((interactions: Array<Interaction>) => this.interactions = interactions);
        });*/
    }

    ngOnDestroy(): void {
        // this.actionsSubscription.unsubscribe();
    }

    prevPerson(): void {
        let idx: number = this.people.findIndex((p: Person) => p.uid === this.person.uid);
        idx--;
        this.hasMorePeople = (idx > 0);
        if (this.people[idx]) {
            this._router.navigate(['/person/view', this.people[idx].uid]);
        }
    }
    nextPerson(): void {
        this.hasMorePeople = true;
        let idx: number = this.people.findIndex((p: Person) => p.uid === this.person.uid);
        idx++;
        if (this.people[idx]) {
            this._router.navigate(['/person/view', this.people[idx].uid]);
        }

    }
    openDlgRelationships(): void {
        this.dialogRef = this._dialog.open(PersonRelationsDialogComponent);

        this.dialogRef.afterClosed().subscribe((result: string) => {
            // this.lastCloseResult = result;
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
            // update and refesh the person being edited
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
