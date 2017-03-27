import { Component, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { style, state, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TitleService } from './common/title.service';
import { AuthService } from './common/auth/auth.service';
import { ShoutService } from './common/shout.service';
import { InteractionService } from './common/interaction.service';

import { Person } from './person/person';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { Note } from './note/note';
import { NoteService } from './note/note.service';
import { NoteCreateDialogComponent } from './note/dialogs/note-create.dialog';

@Component({
    selector: 'mh-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    animations: [
        trigger('drawer', [
            state('false', style({
                width: '200px'
            })),
            state('true',  style({
                width: '75px',
                flex: '1 1 75px;',
                'min-width': '75px',
                'max-width': '75px'
            }))
        ])
    ],
    providers: [InteractionService]
})
export class ViewComponent implements OnInit {
    private dialogRef: MdDialogRef<any>;

    routes: Object[] = [
        {
            title: 'Dashboard', route: '/dashboard', icon: 'dashboard'
        }, {
            title: 'Persons', route: '/person', icon: 'people'
        }, {
            title: 'Events', route: '', icon: 'today'
        }, {
            title: 'Groups', route: '', icon: 'people_outline'
        }
    ];

    currentUser: Person;
    myInteractions: Observable<Note[]>;
    myOutstanding: Observable<Note[]>;

    alwaysVisible: boolean = false;
    drawerVisible: boolean = false;

    constructor(private _shoutService: ShoutService,
                private _interactionService: InteractionService,
                private _auth: AuthService,
                private _noteService: NoteService,
                private _element: ElementRef,
                private _router: Router,
                public _dialog: MdDialog,
                public titleService: TitleService) {
    }

    ngOnInit(): void {
        this.currentUser = this._auth.getCurrentUser();
        this.myInteractions = this._interactionService.myInteractions;
        this.myOutstanding = this.myInteractions.map((data: Note[]) =>
            data.filter((n: Note) => n.dueOn && (!n.actions.doneOn && !n.actions.completedOn))
        );
        this._interactionService.loadMy();
    }

    toggleAlwaysVisible(): void {
        this.alwaysVisible = !this.alwaysVisible;
    }

    toggleFullscreen(): void {
        const elem: any = this._element.nativeElement.querySelector('.demo-content');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullScreen) {
            elem.msRequestFullScreen();
        }
    }

    toggleDrawer(): void {
        this.drawerVisible = this.drawerVisible ? false : true;
    }

    isActiveItem(title: any): boolean {
        return this.titleService.getModule() === title;
    }

    openDlgInteractions(): void {
        const config: MdDialogConfig = new MdDialogConfig();
        config.data = {
        };

        this.dialogRef = this._dialog.open(NoteCreateDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: any) => {
            if (result instanceof Note) {
                this._interactionService.create(result);
                this._shoutService.success('Interaction created!');
            }
            this.dialogRef = undefined;
        });
    }
    createInteraction(): void {
        this._interactionService.setLastRoute(this._router.url);
        this._router.navigate(['/note/create']);
    }
}
