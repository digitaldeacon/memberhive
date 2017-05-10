import { Component, OnInit, OnDestroy } from '@angular/core';
import { style, state, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ShoutService } from '../common/shout.service';
import { InteractionService } from '../common/interaction.service';

import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { Interaction } from '../interaction/interaction';
import { InteractionCreateDialogComponent } from '../interaction/dialogs/interaction-create.dialog';

import { Store } from '@ngrx/store';
import * as app from '../app.store';
import * as settings from 'mh-core';
import { TitleService, Person } from 'mh-core';

@Component({
    selector: 'mh-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    animations: [
        trigger('drawer', [
            state('true', style({
                width: '200px'
            })),
            state('false',  style({
                width: '75px',
                flex: '1 1 75px;',
                'min-width': '75px',
                'max-width': '75px'
            }))
        ])
    ],
    providers: [InteractionService]
})
export class ViewComponent implements OnInit, OnDestroy {
    private _dialogRef: MdDialogRef<any>;
    private _usrSubscr: Subscription;

    routes: Object[] = [
        {
            title: 'Dashboard', route: '/dashboard', icon: 'dashboard'
        },
        {
            title: 'Person', route: '/person', icon: 'people'
        },
        {
            title: 'Events', route: '', icon: 'today'
        },
        {
            title: 'Groups', route: '', icon: 'people_outline'
        },
        {
            title: 'Settings', route: '/settings', icon: 'build'
        }
    ];

    currentUser: Person;
    myInteractions: Observable<Interaction[]>;
    myOutstanding: Observable<Interaction[]>;

    drawerVisible$: Observable<boolean>;
    loading$: Observable<boolean>;

    open: string = 'true';

    constructor(private _shoutService: ShoutService,
                private _interactionService: InteractionService, // TODO: remove with store
                private _router: Router,
                private _store: Store<app.AppState>,
                private _dialog: MdDialog,
                private _titleService: TitleService) {
        this.drawerVisible$ = this._store.select(app.getShowDrawer);
        this.loading$ = this._store.select(app.getLoading);
        this._usrSubscr = this._store.select(app.getAuthPerson)
            .subscribe((p: Person) => {
                this.currentUser = p;
            });
    }

    ngOnInit(): void {
        this.myInteractions = this._interactionService.myInteractions;
        this.myOutstanding = this.myInteractions.map((data: Interaction[]) =>
            data.filter((n: Interaction) => n.dueOn && (!n.actions.doneOn && !n.actions.completedOn))
        );
        this._interactionService.loadMy();
    }

    ngOnDestroy(): void {
        this._usrSubscr.unsubscribe();
    }

    openDrawer(): void {
        this.open = 'true';
        this._store.dispatch(new settings.OpenDrawerAction());
    }
    closeDrawer(): void {
        this.open = 'false';
        this._store.dispatch(new settings.CloseDrawerAction());
    }

    isActiveItem(title: any): boolean {
        // console.log(this._titleService.getModule(), title);
        return this._titleService.getModule() === title;
    }

    getTitle(): string {
        return this._titleService.getTitle();
    }

    openDlgInteractions(): void {
        const config: MdDialogConfig = new MdDialogConfig();
        config.data = {
        };

        this._dialogRef = this._dialog.open(InteractionCreateDialogComponent, config);
        this._dialogRef.afterClosed().subscribe((result: any) => {
            if (result instanceof Interaction) {
                this._interactionService.create(result);
                this._shoutService.success('Interaction created!');
            }
            this._dialogRef = undefined;
        });
    }
    createInteraction(): void {
        this._interactionService.setLastRoute(this._router.url);
        this._router.navigate(['/interaction/create']);
    }
}
