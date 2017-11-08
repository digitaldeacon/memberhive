import {
    Component,
    OnDestroy,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    AfterViewInit,
    ViewChild } from '@angular/core';
import { style, state, trigger, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeWhile';

import { MatSidenav, MatSidenavContainer } from '@angular/material';

import { ShoutService } from '../common/shout.service';

import { Store } from '@ngrx/store';
import * as app from '../app.store';
import {
    Person,
    Message,
    AuthService,
    SystemSettings,
    Interaction,
    SettingsState,
    SignOutAction,
    ContextButton,
    UpdateSettingAction,
    ClearSettingsMessageAction,
    ClearInteractionMessageAction,
    ClearPersonMessageAction,
    LayoutSettings
} from 'mh-core';

@Component({
    selector: 'mh-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    animations: [
        trigger('drawer', [
            state('open', style({
                width: '220px'
            })),
            state('close',  style({
                width: '75px',
                flex: '1 1 75px;',
                'min-width': '75px',
                'max-width': '75px'
            }))
            /*transition('open <=> close', animate('300ms ease-in', keyframes([
                style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                style({opacity: 1, transform: 'translateY(35px)',  offset: 0.5}),
                style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
            ])))*/
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnDestroy, AfterViewInit {
    private _alive: boolean = true;
    @ViewChild('sidenav') private _sidenav: MatSidenav;
    @ViewChild('sidenavContainer') private _container: MatSidenavContainer;
    private _layout: LayoutSettings;

    routes: Object[] = [
        {
            title: 'Dashboard', route: '/dashboard', icon: 'dashboard'
        },
        {
            title: 'People', route: '/person', icon: 'people'
        },
        {
            title: 'Interactions', route: '/interaction', icon: 'forum'
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
    churchName: string;

    loading$: Observable<boolean>;
    title$: Observable<string>;
    contextButtons$: Observable<ContextButton[]>;
    myOutstanding$: Observable<Interaction[]>;

    drawerVisible: boolean = true;
    drawerState: string = 'open';
    headerPaddingClass: string = '';

    constructor(private _authSrv: AuthService,
                private _router: Router,
                private _shout: ShoutService,
                private _store: Store<app.AppState>,
                private _cd: ChangeDetectorRef) {

        this.loading$ = this._store.select(app.getLoading);
        this.title$ = this._store.select(app.getTitle);
        this.contextButtons$ = this._store.select(app.getContextButtons);
        this.myOutstanding$ = this._store.select(app.getMyInteractions);

        this._store.select(app.getShowDrawer).takeWhile(() => this._alive)
            .subscribe((visible: boolean) => {
                this.drawerVisible = visible;
                this.drawerState = visible ? 'open' : 'close';
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
        this._store.select(app.getMessage)
            .takeWhile(() => this._alive)
            .subscribe((message: Message) => {
                if (message) {
                    this._shout.out(message.text, message.type);
                    this._store.dispatch(new ClearSettingsMessageAction());
                    this._store.dispatch(new ClearInteractionMessageAction());
                    this._store.dispatch(new ClearPersonMessageAction());
                }
            });
    }

    ngOnDestroy(): void {
        this._alive = false;
    }

    ngAfterViewInit(): void {
        this.toggleDrawer();
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
        this.toggleDrawer('open');
    }

    closeDrawer(): void {
        const payload: SettingsState = {
            layout: {showDrawer: false}
        };
        this._store.dispatch(new UpdateSettingAction(payload));
        this.toggleDrawer('close');
    }

    toggleDrawer(status: string = 'open'): void {
        let size: number;
        this.drawerState = status;
        size = status === 'open' ? 220 : 75;
        setTimeout(() => {
            this.headerPaddingClass = 'p-' + size.toString();
            this._sidenav.open();
            this._cd.detectChanges();
        }, 0);
    }

    drawerWidth(): string {
        return this.drawerVisible ? '220px' : '75px';
    }

    route(r: string, part?: string): void {
        if (part) {
            this._router.navigate([r, part]);
        } else {
            this._router.navigate([r]);
        }
    }
}
