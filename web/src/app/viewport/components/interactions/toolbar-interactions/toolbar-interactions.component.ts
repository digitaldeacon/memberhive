import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Interaction, AuthService } from 'mh-core';

@Component({
    selector: 'mh-toolbar-interactions',
    templateUrl: './toolbar-interactions.component.html',
    styleUrls: ['./toolbar-interactions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarInteractionsComponent {

    outstandingInteractions: Interaction[];

    @Input()
    set interactions(collection: Interaction[]) {
        if (collection) {
            this.outstandingInteractions = collection
                .filter((i: Interaction) => {
                    return !i.actions[this._auth.getPersonId()].doneOn
                        && !i.actions[this._auth.getPersonId()].completedOn;
                });
        }
    }

    constructor(private _auth: AuthService) { }

}
