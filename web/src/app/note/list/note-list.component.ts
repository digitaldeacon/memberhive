import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { Note } from '../note';
import { NoteService } from '../note.service';
import { NoteCreateDialogComponent } from '../dialogs/note-create.dialog';

import { ShoutService } from '../../common/shout.service';
import { AuthService } from 'mh-core';

import { Person } from 'mh-core';

@Component({
    selector: 'mh-note-list',
    templateUrl: 'note-list.component.html',
    styleUrls: ['note-list.component.scss', '../note-common.styles.scss']
})
export class NoteListComponent implements OnInit {
    private author: Person;
    dialogRef: MdDialogRef<NoteCreateDialogComponent>;
    @Input() notes: Array<Note>;

    constructor(private route: ActivatedRoute,
                private noteService: NoteService,
                private shout: ShoutService,
                private auth: AuthService,
                public dialog: MdDialog) {
    }

    ngOnInit(): void {
        this.author = this.auth.getCurrentUser();
        if (!this.notes) {
            this.route.params
                .switchMap((params: Params) => this.noteService.getNotes(params['id']))
                .subscribe((notes: Array<Note>) => {
                    this.notes = notes;
                });
        }
    }

    iOwn(uid: string): boolean {
        return uid === this.author.uid;
    }

    deleteNote(note: Note): void {

        if (!this.iOwn(note.authorId)) {
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
    openDlgInteractions(note: Note): void {
        let oldNote: Note = note;
        let config: MdDialogConfig = new MdDialogConfig();
        config.data = {
            note: note
        };

        this.dialogRef = this.dialog.open(NoteCreateDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: any) => {
            if (result instanceof Note) {
                this.notes.splice(this.notes.indexOf(oldNote));
                this.notes.unshift(result);
            }
            this.dialogRef = undefined;
        });
    }
}
