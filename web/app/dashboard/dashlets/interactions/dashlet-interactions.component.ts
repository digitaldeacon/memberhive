import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

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
    myInteractions: Array<Note>;

    constructor(public dialog: MdDialog) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['interactions']) {
            this.filter();
        }
    }

    filter(): void {

    }

    settingsDlg(): void {

    }
}
