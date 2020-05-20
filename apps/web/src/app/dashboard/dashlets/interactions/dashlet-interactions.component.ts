import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';

import { AppState, getMyInteractions, Interaction, CompleteInteractionAction, AuthService } from '@memberhivex/core';

@Component({
  selector: 'mh-dashlet-interactions',
  templateUrl: './dashlet-interactions.component.html',
  styleUrls: ['./dashlet-interactions.component.scss']
})
export class DashletInteractionsComponent implements OnInit, OnDestroy {
  private _alive: boolean = true;

  myId: string = '';
  myInteractions$: Observable<Interaction[]>;
  myOutstanding: Interaction[];
  myCompleted: Interaction[];

  constructor(private _store: Store<AppState>, private _auth: AuthService, private _dialog: MatDialog) {
    this.myId = this._auth.personId;
  }

  ngOnInit(): void {
    this.myInteractions$ = this._store.select(getMyInteractions);
    this.myInteractions$.pipe(takeWhile(() => this._alive)).subscribe((data: Interaction[]) => {
      this.myOutstanding = data.filter(
        (i: Interaction) => !i.actions[this.myId].doneOn && !i.actions[this.myId].completedOn
      );
      this.myCompleted = data.filter(
        (i: Interaction) => !i.actions[this.myId].doneOn && i.actions[this.myId].completedOn
      );
    });
  }

  settingsDlg(): void {
    // open settings dialog
  }

  complete(id: number, checked: boolean): void {
    // console.log(id, checked);
    this._store.dispatch(new CompleteInteractionAction({ id: id, complete: checked }));
  }

  delete(interaction: Interaction): void {
    // this._interactionService.remove(interaction.id);
  }

  ngOnDestroy(): void {
    this._alive = false;
  }
}
