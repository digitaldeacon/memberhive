import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { NoteService } from '../../../note/note.service';
import { InteractionService } from '../../../common/interaction.service';

import { Note } from '../../../note/note';

@Component({
    selector: 'mh-dashlet-interactions',
    templateUrl: './dashlet-interactions.component.html',
    styleUrls: ['./dashlet-interactions.component.scss']
})
export class DashletInteractionsComponent implements OnInit, OnChanges {
    private now: Date = new Date();
    private rangeDate: Date;

    myInteractions: Observable<Note[]>;
    myOutstanding: Observable<Note[]>;

    constructor(private _dialog: MdDialog,
                private _noteService: NoteService,
                private _interactionService: InteractionService) {
    }

    ngOnInit(): void {
        this.myInteractions = this._interactionService.myInteractions;
        this.myOutstanding = this.myInteractions.map((data: Note[]) =>
            data.filter((note: Note) => note.dueOn && !note.actions.doneOn)
        );
        this._interactionService.loadMy();
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

    complete(id: number | string, checked: boolean): void {
        this._interactionService.complete(id, checked);
    }

    delete(note: Note): void {
        this._interactionService.remove(note.id);
    }
}
