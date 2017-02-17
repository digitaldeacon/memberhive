import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';

import { NoteService } from "../note.service";
import { Note, NoteType } from "../note";

import { ShoutService } from "../../common/shout.service";

@Component({
    selector: 'mh-note-list',
    templateUrl: 'note-list.component.html',
    styleUrls: ['note-list.component.scss']
})
export class NoteListComponent implements OnInit {
    private notes: Array<Note>;
    private noteTypes: Array<NoteType>;
    private ownerId: string;

    showTypeSelector: boolean = false;
    noteForm: FormGroup;
    submitted: boolean = false;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private noteService: NoteService,
                private shout: ShoutService,
                public dialog: MdDialog) {
        this.noteService.getNoteTypes()
            .subscribe((types: Array<NoteType>) => {
                this.noteTypes = types;
            });
    }

    ngOnInit(): void {
        this.ownerId = this.route.snapshot.params['id'];
        this.noteForm = this.fb.group({
            text: [undefined, [<any>Validators.required]],
            type: [undefined, [<any>Validators.required]],
            private: [undefined]
        });
        this.route.params
            .switchMap((params: Params) => this.noteService.getNotes(params['id']))
            .subscribe((notes: Array<Note>) => {
                this.notes = notes;
            });
    }

    showTypes(): void {
        this.showTypeSelector = true;
    }

    save(model: Note, isValid: boolean): void {
        this.submitted = true;
        this.showTypeSelector = false;
        if (isValid) {
            model.ownerId = this.ownerId;
            this.noteService.createNote(model)
                .subscribe(
                    (data: Note) => {
                        this.noteForm.reset();
                        this.notes.push(data);
                        // TODO: fix sort
                        this.notes.sort((n1: Note, n2: Note) => (n1.createdAt > n2.createdAt) ? 0 : 1);
                        this.shout.success('Note is saved!');
                        return true;
                    },
                    (error: any) => {
                        this.shout.error('Error in save!');
                        return false;
                    }
                );
        }
    }

    iOwn(uid: string): boolean {
        return uid === this.ownerId;
    }
}
