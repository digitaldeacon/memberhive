import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';
import { style, state, trigger, transition, animate, keyframes } from '@angular/animations';
import { MatDialog } from '@angular/material';

import { AuthService, Person, Interaction } from 'mh-core';

@Component({
    selector: 'mh-interaction-list',
    templateUrl: 'interaction-list.component.html',
    styleUrls: ['interaction-list.component.scss', '../interaction-common.styles.scss'],
    /*animations: [
        trigger('signal', [
            state('void', style({

            })),
            state('deleted', style({

            })),
            transition('void => deleted', animate('1s cubic-bezier(0.55, -0.04, 0.91, 0.94) forwards'))
        ])
    ],*/
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractionListComponent implements OnInit {
    private authorId: string;
    @Input() interactions: Array<Interaction>;
    @Input() people: Person[];
    @Output() deleteInteraction: EventEmitter<number> = new EventEmitter<number>();

    // TODO: move these to settings
    types: any[] = [
        {type: 'interaction', iconString: 'swap_vertical_circle'},
        {type: 'note', iconString: 'comment'},
        {type: 'meeting', iconString: 'forum'},
        {type: 'email', iconString: 'email'},
        {type: 'phone', iconString: 'contact_phone'}
    ];

    constructor(private auth: AuthService,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.authorId = this.auth.getPersonId();
    }

    // TODO: possibly remove with settings
    getType(t: string): string {
        return this.types.filter((v: any) => v.type === t)[0].iconString;
    }

    iOwn(uid: string): boolean {
        return uid === this.authorId;
    }

    delete(interaction: Interaction): void {
        if (!this.iOwn(interaction.author.id)) {
            return;
        }
        this.deleteInteraction.emit(interaction.id);
    }

    recipientTag(uid: string): string {
      const p: Person = this._person(uid);
      if (Object.keys(p).length > 0) {
        return p.firstName.substring(0, 1).toUpperCase() +
          p.lastName; // .substring(0, 1).toUpperCase();
      }
      return '';
    }

    private _person(uid: string): Person {
      if (this.people.length > 0 && uid) {
        return this.people.filter((p: Person) => p.uid === uid)[0];
      }
      return undefined;
    }
}
