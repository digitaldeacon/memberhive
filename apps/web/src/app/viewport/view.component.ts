import { Component, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { style, state, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeWhile';

import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { MatSidenav } from '@angular/material';

import { ShoutService } from '../common/shout.service';

import { Store } from '@ngrx/store';
import * as core from '@memberhivex/core';
import { I18n } from '@ngx-translate/i18n-polyfill';

const enum DrawerState {
  OPENED = 'opened',
  CLOSED = 'closed'
}

@Component({
  selector: 'mh-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewComponent implements OnDestroy {
  private _alive: boolean = true;

  routes: Object[] = [
    {
      title: this.i18n({ value: 'Dashboard', id: 'menu.dashboard' }),
      route: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: this.i18n({ value: 'People', id: 'menu.people' }),
      route: '/person',
      icon: 'people'
    },
    /*{
            title: 'Interactions', route: '/interaction', icon: 'forum'
        },
         {
            title: 'Events', route: '', icon: 'today'
        },
        {
            title: 'Groups', route: '', icon: 'people_outline'
        },*/
    {
      title: this.i18n({ value: 'Settings', id: 'menu.settings' }),
      route: '/settings',
      icon: 'build'
    }
  ];

  currentUser: core.Person;
  churchName: string;

  loading$: Observable<boolean>;
  title$: Observable<string>;
  contextButtons$: Observable<core.ContextButton[]>;
  myOutstanding$: Observable<core.Interaction[]>;

  watcher: Subscription;
  drawerState: DrawerState = DrawerState.OPENED;
  drawerMode: string = 'side';
  drawerClass: string = 'drawer-opened';
  previousAlias: string = '';

  @ViewChild('sidenav') private _sidenav: MatSidenav;

  constructor(
    private _authSrv: core.AuthService,
    private _router: Router,
    private _shout: ShoutService,
    private _store: Store<core.AppState>,
    private _media: ObservableMedia,
    public i18n: I18n
  ) {
    this._initStore();
    this.watcher = _media.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs' && change.mqAlias !== this.previousAlias) {
        this._toggleMobile(true);
      } else if (this.previousAlias === 'xs') {
        this._toggleMobile(false);
      }
      this.previousAlias = change.mqAlias;
    });
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  logout(): void {
    this._authSrv.clearStore().then(() => {
      this._store.dispatch(new core.SignOutAction());
    });
  }

  openDrawer(): void {
    const payload: core.SettingsState = {
      layout: { showDrawer: true }
    };
    this._store.dispatch(new core.UpdateSettingAction(payload));
  }

  closeDrawer(): void {
    const payload: core.SettingsState = {
      layout: { showDrawer: false }
    };
    this._store.dispatch(new core.UpdateSettingAction(payload));
  }

  toggleDrawer(status: DrawerState = DrawerState.OPENED): void {
    this.drawerState = status;
    this.drawerClass = 'drawer-' + status;
  }

  paddingClasses(): string {
    if (this._sidenav.mode === 'over') {
      return '';
    }
    return 'p-' + this.drawerState;
  }

  route(r: string, part?: string): void {
    if (part) {
      this._router.navigate([r, part]);
    } else {
      this._router.navigate([r]);
    }
  }

  private _toggleMobile(isMobile: boolean): void {
    if (isMobile) {
      this.drawerMode = 'over';
      this._sidenav.close();
      this.toggleDrawer(DrawerState.OPENED);
    } else {
      this.drawerMode = 'side';
      this._sidenav.open();
    }
  }

  private _initStore(): void {
    this.loading$ = this._store.select(core.getLoading);
    this.title$ = this._store.select(core.getTitle);
    this.contextButtons$ = this._store.select(core.getContextButtons);
    this.myOutstanding$ = this._store.select(core.getMyInteractions);

    this._store
      .select(core.getShowDrawer)
      .takeWhile(() => this._alive)
      .subscribe((visible: boolean) => {
        this.drawerState = visible ? DrawerState.OPENED : DrawerState.CLOSED;
        this.drawerClass = 'drawer-' + this.drawerState;
      });
    this._store
      .select(core.getAuthPerson)
      .takeWhile(() => this._alive)
      .subscribe((p: core.Person) => {
        this.currentUser = p;
      });
    this._store
      .select(core.getSysSettings)
      .takeWhile(() => this._alive)
      .subscribe((data: core.SystemSettings) => {
        if (data) {
          this.churchName = data.churchName;
        }
      });
    this._store
      .select(core.getMessage)
      .takeWhile(() => this._alive)
      .subscribe((message: core.Message) => {
        if (message) {
          this._shout.out(message.text, message.type);
          this._store.dispatch(new core.ClearSettingsMessageAction());
          this._store.dispatch(new core.ClearInteractionMessageAction());
          this._store.dispatch(new core.ClearPersonMessageAction());
          this._store.dispatch(new core.ClearFamilyMessageAction());
        }
      });
  }
}
