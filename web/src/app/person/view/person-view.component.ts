import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { TitleService } from "../../common/title.service";
import { PersonService } from "../person.service";
import { InteractionService } from "../../common/interaction.service";
import { Person } from "../person";

import { AvatarEditDialogComponent } from '../dialogs/avatar-edit.dialog';
import { PersonRelationsDialogComponent } from "../dialogs/person-relations.dialog";

import { Note } from "../../note/note";
import { NoteService } from "../../note/note.service";
import { NoteCreateDialogComponent } from '../../note/dialogs/note-create.dialog';

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-view',
    templateUrl: './person-view.component.html',
    styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {
    notes: Array<Note>;
    people: Array<Person>;
    person: Person;
    dialogRef: MdDialogRef<any>;
    hasMorePeople: boolean = false;

    constructor(private _titleService: TitleService,
                private _router: Router,
                private _route: ActivatedRoute,
                private _personService: PersonService,
                private _noteService: NoteService,
                private _interactionService: InteractionService,
                private _dialog: MdDialog) {
    }

    ngOnInit(): void {
        this._route.params
            .switchMap((params: Params) => this._personService.getPerson(params['id']))
            .subscribe((person: Person) => {
                this.person = person;
                this._titleService.setTitle('Person: ' + person.fullName);
                this._noteService.getNotes(person.uid)
                    .subscribe((notes: Array<Note>) => this.notes = notes);
        });
    }

    prevPerson(): void {
        this._personService.getPersons() // TODO: get them from the cache
            .subscribe(
                (people: Array<Person>) => {
                    this.people = people;
                    let idx: number = this.people.findIndex((p: Person) => p.uid === this.person.uid);
                    idx--;
                    this.hasMorePeople = (idx > 0);
                    if (this.people[idx]) {
                        this._router.navigate(['/person/view', this.people[idx].uid]);
                    }
                });
    }
    nextPerson(): void {
        this.hasMorePeople = true;
        this._personService.getPersons() // TODO: get them from the cache
            .subscribe(
                (people: Array<Person>) => {
                    this.people = people;
                    let idx: number = this.people.findIndex((p: Person) => p.uid === this.person.uid);
                    idx++;
                    if (this.people[idx]) {
                        this._router.navigate(['/person/view', this.people[idx].uid]);
                    }
                });
    }
    openDlgRelationships(): void {
        this.dialogRef = this._dialog.open(PersonRelationsDialogComponent);

        this.dialogRef.afterClosed().subscribe((result: string) => {
            // this.lastCloseResult = result;
            this.dialogRef = undefined;
        });
    }
    openDlgAvatar(): void {
        let config: MdDialogConfig = new MdDialogConfig();
        config.data = {
            context: 'person',
            id: this.person.uid,
            avatar: this.person.avatar
        };

        this.dialogRef = this._dialog.open(AvatarEditDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: any) => {
            if (result === typeof Person) {
                this.person = result;
            }
            // update and refesh the person being edited
            this.dialogRef = undefined;
        });
    }
    openDlgInteractions(): void {
        let config: MdDialogConfig = new MdDialogConfig();
        config.data = {
            id: this.person.uid
        };

        this.dialogRef = this._dialog.open(NoteCreateDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: any) => {
            if (result instanceof Note) {
                this.notes.unshift(result);
            }
            this.dialogRef = undefined;
        });
    }
    createInteraction(): void {
        this._interactionService.init(this.person);
        this._interactionService.setLastRoute(this._router.url);
        this._router.navigate(['/note/create']);
    }
}
