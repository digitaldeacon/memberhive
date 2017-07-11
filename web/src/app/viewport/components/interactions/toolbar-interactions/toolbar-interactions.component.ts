import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Interaction, AuthService } from 'mh-core';

@Component({
    selector: 'mh-toolbar-interactions',
    templateUrl: './toolbar-interactions.component.html',
    styleUrls: ['./toolbar-interactions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarInteractionsComponent {

    private _interactions: Interaction[];

    @Input()
    set interactions(i: Interaction[]) {
        this._interactions = i;
    }
    get interactions(): Interaction[] {
        return this._interactions.filter((i: Interaction) => {
            return !i.actions[this._auth.getPersonId()].doneOn
                && !i.actions[this._auth.getPersonId()].completedOn;
        });
    }

    constructor(private _auth: AuthService) { }

}
