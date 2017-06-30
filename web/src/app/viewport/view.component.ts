import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { style, state, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { ShoutService } from '../common/shout.service';
import { MdDialog } from '@angular/material';

// TODO: remove with interactions in store
import { InteractionService } from '../common/interaction.service';
import { Interaction } from '../interaction/interaction';

import { Store } from '@ngrx/store';
import * as app from '../app.store';
import {
    TitleService,
    Person,
    AuthService,
    SystemSettings,
    LayoutSettings,
    SettingsState,
    SignOutAction,
    ContextButton,
    UpdateSettingAction
} from 'mh-core';

@Component({
    selector: 'mh-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    animations: [
        trigger('drawer', [
            state('true', style({
                width: '256px'
            })),
            state('false',  style({
                width: '75px',
                flex: '1 1 75px;',
                'min-width': '75px',
                'max-width': '75px'
            }))
        ])
    ],
    // changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [InteractionService]
})
export class ViewComponent implements OnInit, OnDestroy {
    private _alive: boolean = true;

    routes: Object[] = [
        {
            title: 'Dashboard', route: '/dashboard', icon: 'dashboard'
        },
        {
            title: 'People', route: '/person', icon: 'people'
        },
        /* {
            title: 'Events', route: '', icon: 'today'
        },
        {
            title: 'Groups', route: '', icon: 'people_outline'
        },*/
        {
            title: 'Settings', route: '/settings', icon: 'build'
        }
    ];

    currentUser: Person;
    myInteractions: Observable<Interaction[]>;
    myOutstanding: Observable<Interaction[]>;
    churchName: string;

    loading$: Observable<boolean>;
    contextButtons$: Observable<ContextButton[]>;

    drawerVisible: boolean;

    constructor(private _authSrv: AuthService,
                private _interactionService: InteractionService, // TODO: remove with store
                private _router: Router,
                private _store: Store<app.AppState>,
                private _titleService: TitleService) {
        this.loading$ = this._store.select(app.getLoading);
        this.contextButtons$ = this._store.select(app.getContextButtons);
        this._store.select(app.getShowDrawer).takeWhile(() => this._alive)
            .subscribe((visible: boolean) => {
                this.drawerVisible = visible;
            });
        this._store.select(app.getAuthPerson).takeWhile(() => this._alive)
            .subscribe((p: Person) => {
                this.currentUser = p;
            });
        this._store.select(app.getSysSettings).takeWhile(() => this._alive)
            .subscribe((data: SystemSettings) => {
                if (data) {
                    this.churchName = data.churchName;
                }
            });
    }

    ngOnInit(): void {
        /*this.myInteractions = this._interactionService.myInteractions;
        this.myOutstanding = this.myInteractions.map((data: Interaction[]) =>
            data.filter((n: Interaction) => n.dueOn && (!n.actions.doneOn && !n.actions.completedOn))
        );
        this._interactionService.loadMy();*/
    }

    ngOnDestroy(): void {
        this._alive = false;
    }

    logout(): void {
        this._authSrv.clearStore();
        this._store.dispatch(new SignOutAction());
    }

    openDrawer(): void {
        const payload: SettingsState = {
            layout: {showDrawer: true}
        };
        this._store.dispatch(new UpdateSettingAction(payload));
    }
    closeDrawer(): void {
        const payload: SettingsState = {
            layout: {showDrawer: false}
        };
        this._store.dispatch(new UpdateSettingAction(payload));
    }
    drawerWidth(): string {
        return this.drawerVisible ? '220px' : '75px';
    }

    isActiveItem(module: any): boolean {
        return this._titleService.getModule() === module;
    }

    getTitle(): string {
        return this._titleService.getTitle();
    }
    route(r: string): void {
        this._router.navigate([r]);
    }
    createInteraction(): void {
        this._interactionService.setLastRoute(this._router.url);
        this._router.navigate(['/interaction/create']);
    }
}
