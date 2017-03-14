import { Component, style, state, trigger, ElementRef, OnInit } from '@angular/core';

import { TitleService } from './common/title.service';
import { AuthService } from './common/auth/auth.service';
import { ShoutService } from "./common/shout.service";

import { Person } from './person/person';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { Note } from "./note/note";
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
            /*transition('0 => 1', animate('200ms ease-in')),
            transition('1 => 0', animate('200ms ease-out'))*/
        ])
    ]
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

    alwaysVisible: boolean = false;
    drawerVisible: boolean = false;

    constructor(private _titleService: TitleService,
                private _shoutService: ShoutService,
                private _auth: AuthService,
                public _dialog: MdDialog,
                private _element: ElementRef) {
    }

    ngOnInit(): void {
        this.currentUser = this._auth.getCurrentUser();
    }

    toggleAlwaysVisible(): void {
        this.alwaysVisible = !this.alwaysVisible;
    }

    toggleFullscreen(): void {
        let elem: any = this._element.nativeElement.querySelector('.demo-content');
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
        return this._titleService.getModule() === title;
    }

    openDlgInteractions(): void {
        let config: MdDialogConfig = new MdDialogConfig();
        config.data = {
        };

        this.dialogRef = this._dialog.open(NoteCreateDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: any) => {
            if (result instanceof Note) {
                this._shoutService.success('Interaction created!');
            }
            this.dialogRef = undefined;
        });
    }
}
