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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    @Input() refPerson: Person;
    @Input() people: Person[];

    @Output() deleteInteraction: EventEmitter<number> = new EventEmitter<number>();
    @Output() addInteraction: EventEmitter<Interaction> = new EventEmitter<Interaction>();

    quickNote: boolean = false;
    qnForm: FormGroup;

    // TODO: move these to settings
    types: any[] = [
        {type: 'interaction', iconString: 'swap_vertical_circle'},
        {type: 'note', iconString: 'comment'},
        {type: 'meeting', iconString: 'forum'},
        {type: 'email', iconString: 'email'},
        {type: 'phone', iconString: 'contact_phone'}
    ];
    // TODO: fetch these from the auth groups DB
    visibility: any[] = [
        {id: 'PRIVATE', text: 'Only Me', icon: 'lock'},
        {id: 'SHEPHERD', text: 'Shepherds', icon: 'group'},
        {id: 'LEADER', text: 'Leaders', icon: 'group'},
        {id: 'STAFF', text: 'Staff', icon: 'group'},
        {id: 'ALL', text: 'Users', icon: 'person'}
    ];

    constructor(private _auth: AuthService,
                private _fb: FormBuilder,
                public dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.authorId = this._auth.getPersonId();
        this.qnForm = this._fb.group({
            quickNoteText: ['', [<any>Validators.required]],
            visibility: ['LEADER', [<any>Validators.required]]
        });
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

    saveQuickNote(): void {
        if (this.qnForm.valid) {
            let qnote: Interaction = {
                type: 'note',
                text: this.qnForm.get('quickNoteText').value,
                author: {id: this.authorId},
                refId: this.refPerson.uid,
                visibility: this.qnForm.get('visibility').value,
            };
            this.addInteraction.emit(qnote);
            this.qnForm.reset();
            this.quickNote = false;
            // TODO: add animation closing the card
        }
    }

    toggleQuickNote(): void {
        this.quickNote = !this.quickNote;
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
