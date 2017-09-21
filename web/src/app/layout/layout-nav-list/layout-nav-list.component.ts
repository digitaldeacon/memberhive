import { Component, Input, ViewChild, forwardRef, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { MdSidenav, MdDrawerToggleResult } from '@angular/material';

import { MhLayoutComponent } from '../layout.component';

@Component({
  selector: 'mh-layout-nav-list',
  styleUrls: ['./layout-nav-list.component.scss' ],
  templateUrl: './layout-nav-list.component.html'
})
export class MhLayoutNavListComponent {

  @ViewChild(MdSidenav) _sideNav: MdSidenav;

  /**
   * toolbarTitle?: string
   *
   * Title set in toolbar.
   */
  @Input('toolbarTitle') toolbarTitle: string;

  /**
   * icon?: string
   * icon name to be displayed before the title
   */
  @Input('icon') icon: string;

  /**
   * logo?: string
   *
   * logo icon name to be displayed before the title.
   * If [icon] is set, then this will not be shown.
   */
  @Input('logo') logo: string;

  /**
   * color?: string
   *
   * toolbar color option: primary | accent | warn.
   * If [color] is not set, primary is used.
   */
  @Input('color') color: string = 'primary';

  /**
   * mode?: 'side', 'push' or 'over'
   *
   * The mode or styling of the sidenav.
   * Defaults to "side".
   * See "MdSidenav" documentation for more info.
   *
   * https://github.com/angular/material2/tree/master/src/lib/sidenav
   */
  @Input('mode') mode: 'side' | 'push' | 'over' = 'side';

  /**
   * opened?: boolean
   * Whether or not the sidenav is opened. Use this binding to open/close the sidenav.
   * Defaults to "true".
   *
   * See "MdSidenav" documentation for more info.
   *
   * https://github.com/angular/material2/tree/master/src/lib/sidenav
   */
  @Input('opened') opened: boolean = true;

  /**
   * sidenavWidth?: string
   *
   * Sets the "width" of the sidenav in either "px" or "%" ("%" is not well supported yet as stated in the layout docs)
   * Defaults to "350px".
   *
   * https://github.com/angular/material2/tree/master/src/lib/sidenav
   */
  @Input('sidenavWidth') sidenavWidth: string = '350px';

  /**
   * navigationRoute?: string
   *
   * option to set the combined route for the icon, logo, and toolbarTitle.
   */
  @Input('navigationRoute') navigationRoute: string;

  /**
   * Checks if there is a [MhLayoutComponent] as parent.
   */
  get isMainSidenavAvailable(): boolean {
    return !!this._layout;
  }

  /**
   * Checks if `ESC` should close the sidenav
   * Should only close it for `push` and `over` modes
   */
  get disableClose(): boolean {
    return this.mode === 'side';
  }

  /**
   * Checks if router was injected.
   */
  get routerEnabled(): boolean {
    return !!this._router && !!this.navigationRoute;
  }

  constructor(@Optional() @Inject(forwardRef(() => MhLayoutComponent)) private _layout: MhLayoutComponent,
              @Optional() private _router: Router) {}

  handleNavigationClick(): void {
    if (this.routerEnabled) {
      this._router.navigateByUrl(this.navigationRoute);
    }
  }

  /**
   * Proxy toggle method to access sidenav from outside (from mh-layout template).
   */
  public toggle(): Promise<MdDrawerToggleResult> {
    return this._sideNav.toggle(!this._sideNav.opened);
  }

  /**
   * Proxy open method to access sidenav from outside (from mh-layout template).
   */
  public open(): Promise<MdDrawerToggleResult> {
    return this._sideNav.open();
  }

  /**
   * Proxy close method to access sidenav from outside (from mh-layout template).
   */
  public close(): Promise<MdDrawerToggleResult> {
    return this._sideNav.close();
  }

  /**
   * If main sidenav is available, it will open the sidenav of the parent [MhLayoutComponent].
   */
  openMainSidenav(): void {
    this._layout.toggle();
  }

}
