import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { NoteService } from '../../../note/note.service';

import { Note } from '../../../note/note';

@Component({
    selector: 'mh-dashlet-interactions',
    templateUrl: './dashlet-interactions.component.html',
    styleUrls: ['./dashlet-interactions.component.scss']
})
export class DashletInteractionsComponent implements OnChanges {

    private now: Date = new Date();
    private rangeDate: Date;

    myOutstanding: Array<Note>;

    constructor(public dialog: MdDialog,
                private _noteService: NoteService) {
        this._noteService.getMyInteractions()
            .subscribe((notes: Note[]) => {
                this.myOutstanding = notes.filter((n: Note) => n.dueOn && !n.actions.doneOn);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['interactions']) {
            this.filter();
        }
    }

    filter(): void {
        // filter function
    }

    settingsDlg(): void {
        // open settings dialog
    }

    complete(note: Note, checked: boolean): void {
        this._noteService.completeInteraction(note, checked)
            .subscribe((r: any) => {
                // notify the service about this change
            });
    }

    delete(note: Note): void {
        this._noteService.endInteraction(note)
            .subscribe((r: any) => {
                this.myOutstanding.splice(this.myOutstanding.indexOf(note));
                // notify the service about this change
            });
    }
}
