import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Interaction } from 'mh-core';
import * as app from '../../../app.store';

@Component({
    selector: 'mh-dashlet-interactions',
    templateUrl: './dashlet-interactions.component.html',
    styleUrls: ['./dashlet-interactions.component.scss']
})
export class DashletInteractionsComponent implements OnInit, OnDestroy {
    private now: Date = new Date();
    private rangeDate: Date;
    private _alive: boolean = true;

    myInteractions$: Observable<Interaction[]>;
    myOutstanding: Interaction[];

    constructor(private _store: Store<app.AppState>,
                private _dialog: MdDialog) {
    }

    ngOnInit(): void {
      this.myInteractions$ = this._store.select(app.getMyInteractions);
      this.myInteractions$.takeWhile(() => this._alive)
        .subscribe((data: Interaction[]) => {
        this.myOutstanding = data.filter((interaction: Interaction) =>
          (interaction.dueOn && !interaction.actions.doneOn) || !interaction.dueOn
        );
      });
    }

    settingsDlg(): void {
        // open settings dialog
    }

    complete(id: number | string, checked: boolean): void {
        // this._interactionService.complete(id, checked);
    }

    delete(interaction: Interaction): void {
        // this._interactionService.remove(interaction.id);
    }

    ngOnDestroy(): void {
      this._alive = false;
    }
}
