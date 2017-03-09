import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MdDialog, MdButtonToggleChange} from '@angular/material';

import { NoteService } from "../note.service";
import { Note, NoteType } from "../note";

import { ShoutService } from "../../common/shout.service";
import { AuthService } from '../../common/auth/auth.service';

import { PersonService } from "../../person/person.service";
import { Person } from '../../person/person';

@Component({
    selector: 'mh-note-list',
    templateUrl: 'note-list.component.html',
    styleUrls: ['note-list.component.scss']
})
export class NoteListComponent implements OnInit {
    private notes: Array<Note>;
    private owner: Person;

    noteTypes: Array<NoteType>;
    selectedType: any;
    noteForm: FormGroup;
    showTypeSelector: boolean = false;
    submitted: boolean = false;
    allowedContacts: Array<Person>;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private noteService: NoteService,
                private shout: ShoutService,
                private personService: PersonService,
                private auth: AuthService,
                public dialog: MdDialog) {
        this.noteService.getNoteTypes() // TODO: move this into the options table
            .subscribe((types: Array<NoteType>) => {
                this.noteTypes = types;
            });
    }

    ngOnInit(): void {
        this.owner = this.auth.getCurrentUser();
        this.noteForm = this.fb.group({
            text: [undefined, [<any>Validators.required]],
            type: [undefined, [<any>Validators.required]],
            owner: [this.owner.uid],
            assigned: [undefined],
            private: [undefined]
        });
        this.route.params
            .switchMap((params: Params) => this.noteService.getNotes(params['id']))
            .subscribe((notes: Array<Note>) => {
                this.notes = notes;
            });
        this.getAllowedContacts();
    }

    getAllowedContacts() {
        // TODO: get only those users that I can select
        this.personService.getPersons()
            .subscribe((people: Array<Person>) => this.allowedContacts = people);
    }

    toggleTypes(): void {
        if (this.showTypeSelector && !this.noteForm.dirty) {
            this.noteForm.reset();
            this.showTypeSelector = false;
        } else {
            this.showTypeSelector = true;
        }
    }

    toggleFields(event: MdButtonToggleChange): void {
        if (event.value === 'interaction') {
            // show interaction fields here
        }
    }

    clearForm(): void {
        this.noteForm.reset();
        this.showTypeSelector = false;
        this.noteForm.get('owner').setValue(this.owner.uid);
    }

    save(model: Note, isValid: boolean): void {
        this.submitted = true;
        this.showTypeSelector = false;
        if (isValid) {
            model.ownerId = this.owner.uid;
            model.recipients = [this.route.snapshot.params['id']];
            this.noteService.createNotePerson(model)
                .subscribe(
                    (data: Note) => {
                        this.noteForm.reset();
                        this.notes.unshift(data);
                        this.shout.success('Note is saved!');
                        return true;
                    },
                    (error: any) => {
                        this.shout.error('Error in save!' + error);
                        return false;
                    }
                );
        }
    }

    iOwn(uid: string): boolean {
        return uid === this.owner.uid;
    }

    deleteNote(note: Note): void {

        if (!this.iOwn(note.ownerId)) {
            return;
        }
        this.noteService.deleteNote(note)
            .subscribe(
                (data: string) => {
                    this.notes.splice(this.notes.indexOf(note), 1);
                    this.shout.success('Note is deleted!');
                    return true;
                },
                (error: any) => {
                    this.shout.error('Error in note delete!');
                    // console.log(error);
                    return false;
                }
            );
    }
}
