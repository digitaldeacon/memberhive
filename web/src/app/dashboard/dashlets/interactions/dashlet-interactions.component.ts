import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Interaction } from 'mh-core';

@Component({
    selector: 'mh-dashlet-interactions',
    templateUrl: './dashlet-interactions.component.html',
    styleUrls: ['./dashlet-interactions.component.scss']
})
export class DashletInteractionsComponent implements OnInit, OnChanges {
    private now: Date = new Date();
    private rangeDate: Date;

    myInteractions: Observable<Interaction[]>;
    myOutstanding: Observable<Interaction[]>;

    constructor(private _dialog: MdDialog) {
    }

    ngOnInit(): void {
        /*this.myInteractions = this._interactionService.myInteractions;
        this.myOutstanding = this.myInteractions.map((data: Interaction[]) =>
            data.filter((interaction: Interaction) => interaction.dueOn && !interaction.actions.doneOn)
        );
        this._interactionService.loadMy();*/
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
        //this._interactionService.complete(id, checked);
    }

    delete(interaction: Interaction): void {
        //this._interactionService.remove(interaction.id);
    }
}
