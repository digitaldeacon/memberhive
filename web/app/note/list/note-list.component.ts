import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { MdDialog } from '@angular/material';

import { NoteService } from "../note.service";
import { Note } from "../note";

import { ShoutService } from "../../common/shout.service";
import { AuthService } from '../../common/auth/auth.service';

import { Person } from '../../person/person';

@Component({
    selector: 'mh-note-list',
    templateUrl: 'note-list.component.html',
    styleUrls: ['note-list.component.scss', '../note-common.styles.scss']
})
export class NoteListComponent implements OnInit {
    private notes: Array<Note>;
    private owner: Person;

    constructor(private route: ActivatedRoute,
                private noteService: NoteService,
                private shout: ShoutService,
                private auth: AuthService,
                public dialog: MdDialog) {
    }

    ngOnInit(): void {
        this.owner = this.auth.getCurrentUser();
        this.route.params
            .switchMap((params: Params) => this.noteService.getNotes(params['id']))
            .subscribe((notes: Array<Note>) => {
                this.notes = notes;
            });
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
