import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdButtonToggleChange } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PersonService } from "../../person/person.service";
import { Person } from "../../person/person";

import { Note, NoteType } from "../note";
import { NoteService } from "../note.service";

@Component({
    selector: 'mh-note-create-dialog',
    templateUrl: './note-create.dialog.html',
    styleUrls: ['./note-create.dialog.scss', '../note-common.styles.scss']
})
export class NoteCreateDialogComponent implements OnInit {

    allowedContacts: Array<Person>;
    noteForm: FormGroup;
    noteTypes: Array<NoteType>;
    selectedType: any;
    showTypeSelector: boolean = false;
    submitted: boolean = false;

    constructor(private fb: FormBuilder,
                private personService: PersonService,
                private noteService: NoteService,
                public dialogRef: MdDialogRef<NoteCreateDialogComponent>,
                @Inject(MD_DIALOG_DATA) public dialogData: any) {
        this.noteService.getNoteTypes() // TODO: move this into the options table
            .subscribe((types: Array<NoteType>) => {
                this.noteTypes = types;
            });
    }

    ngOnInit(): void {
        if (this.dialogData.id) {
            this.getAllowedContacts();
            this.noteForm = this.fb.group({
                text: [undefined, [<any>Validators.required]],
                type: [undefined, [<any>Validators.required]],
                owner: [this.dialogData.id],
                assigned: [undefined],
                private: [undefined]
            });
        }
    }

    getAllowedContacts(): void {
        // TODO: get only those users that I can select
        this.personService.getPersons()
            .subscribe((people: Array<Person>) => this.allowedContacts = people);
    }

    toggleTypes(): void {
        if (this.showTypeSelector && !this.noteForm.dirty) {
            this.noteForm.reset();
            this.showTypeSelector = false;
            this.noteForm.get('owner').setValue(this.dialogData.id);
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
        this.noteForm.get('owner').setValue(this.dialogData.id);
    }

    save(model: Note, isValid: boolean): void {
        this.submitted = true;
        this.showTypeSelector = false;
        if (isValid) {
            model.ownerId = this.dialogData.id;
            model.recipients = [];
            this.noteService.createNotePerson(model)
                .subscribe(
                    (data: Note) => {
                        this.noteForm.reset();
                        // this.notes.unshift(data);
                        // this.shout.success('Note is saved!');
                        return true;
                    },
                    (error: any) => {
                        // this.shout.error('Error in save!' + error);
                        return false;
                    }
                );
        }
    }
}
