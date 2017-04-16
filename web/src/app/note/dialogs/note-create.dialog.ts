import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdButtonToggleChange } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PersonService } from '../../person/person.service';
import { Person } from 'mh-core';

import { Note, NoteType } from '../note';
import { NoteService } from '../note.service';

import { AuthService } from 'mh-core';

@Component({
    selector: 'mh-note-create-dialog',
    templateUrl: './note-create.dialog.html',
    styleUrls: ['./note-create.dialog.scss', '../note-common.styles.scss']
})
export class NoteCreateDialogComponent implements OnInit {
    private _author: Person;
    private _refPerson: Person;

    noteForm: FormGroup;
    noteTypes: Array<NoteType>;
    note: Note;

    allowedContacts: Array<Person>;

    showTypeSelector: boolean = false;
    submitted: boolean = false;
    editMode: boolean = false;
    error: string;

    constructor(private _fb: FormBuilder,
                private _personService: PersonService,
                private _noteService: NoteService,
                private _auth: AuthService,
                private _dialogRef: MdDialogRef<NoteCreateDialogComponent>,
                @Inject(MD_DIALOG_DATA) public dialogData: any) {
        this._noteService.getNoteTypes() // TODO: move this into the options table
            .subscribe((types: Array<NoteType>) => {
                this.noteTypes = types;
            });
        this._author = this._auth.getCurrentUser();
    }

    ngOnInit(): void {
        this.getAllowedContacts();
        this.noteForm = this._fb.group({
            text: [undefined, [<any>Validators.required]],
            type: [undefined, [<any>Validators.required]],
            owner: [undefined, [<any>Validators.required]],
            recipients: [undefined, [<any>Validators.required]],
            dueOn: [undefined],
            private: [undefined]
        });
        this.initDefaults();
    }

    getAllowedContacts(): void {
        // TODO: get only those users that I can select
        this._personService.getPersons()
            .subscribe((people: Array<Person>) => this.allowedContacts = people);
    }

    toggleTypes(): void {
        if (this.showTypeSelector && !this.noteForm.dirty) {
            this.noteForm.reset();
            this.showTypeSelector = false;
            this.initDefaults();
        } else {
            this.showTypeSelector = true;
        }
    }

    toggleFields(event: MdButtonToggleChange): void {
        if (event.value === 'interaction') {
            // show interaction fields here
        }
    }

    keyupHandlerFunction(event: any): void {
        // console.log('note-list', event);
    }

    clearForm(): void {
        this.noteForm.reset();
        this.showTypeSelector = false;
        this.initDefaults();
    }

    save(model: Note, isValid: boolean): void {
        this.submitted = true;
        this.showTypeSelector = false;
        if (isValid) {
            model.authorId = this._author.uid;
            if (this.dialogData.note) {
                model.uid = this.dialogData.note.uid;
            }
            this._noteService.createNotePerson(model)
                .subscribe(
                    (note: Note) => {
                        this.noteForm.reset();
                        this._dialogRef.close(note);
                        return true;
                    },
                    (error: any) => {
                        this.error = error;
                        return false;
                    }
                );
        }
    }

    private initDefaults(): void {
        if (this.noteForm && this._author && !this.dialogData.note) {
            this.noteForm.get('recipients').setValue([this._author.uid]);
        }
        // person related interaction
        if (this.dialogData.id && !this.dialogData.note) {
            this.noteForm.get('owner').setValue(this.dialogData.id);
        }
        if (this.dialogData.note) {
            this.note = this.dialogData.note;
            this.noteForm.get('owner').setValue(this.note.ownerId);
            this.noteForm.get('text').setValue(this.note.text);
            this.noteForm.get('type').setValue(this.note.typeId);
            this.noteForm.get('recipients').setValue(this.note.recipients);
            this.editMode = true;
        }
        // birthday interactions
        if (this.dialogData.person) {
            this._refPerson = this.dialogData.person;
            this.noteForm.get('owner').setValue(this._refPerson.uid);
            this.noteForm.get('dueOn').setValue(this._refPerson.birthday);
        }
    }
}
