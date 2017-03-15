import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { InteractionService } from "../../../common/interaction.service";

import { Note } from '../../../note/note';

@Component({
    selector: 'mh-dashlet-interactions',
    templateUrl: './dashlet-interactions.component.html',
    styleUrls: ['./dashlet-interactions.component.scss']
})
export class DashletInteractionsComponent implements OnChanges {

    private now: Date = new Date();
    private rangeDate: Date;

    @Input() interactions: Array<Note>;
    myOutstanding: Array<Note>;

    constructor(public dialog: MdDialog,
                private _interactionService: InteractionService) {
        this.interactions = this._interactionService.getMyInteractions();
        this.myOutstanding = this.interactions.filter((n: Note) => n.dueOn && !n.doneOn);
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
}
