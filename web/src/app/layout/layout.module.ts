import { Type, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdSidenavModule,
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdCardModule,
  MdListModule,
  ScrollDispatchModule } from '@angular/material';

import { MhLayoutComponent } from './layout.component';
import { MhLayoutNavComponent } from './layout-nav/layout-nav.component';
import { MhLayoutNavListComponent } from './layout-nav-list/layout-nav-list.component';
import { MhLayoutManageListComponent } from './layout-manage-list/layout-manage-list.component';
import { MhLayoutFooterComponent } from './layout-footer/layout-footer.component';

import {
  MhNavigationDrawerComponent,
  MhNavigationDrawerMenuDirective } from './navigation-drawer/navigation-drawer.component';

const TD_LAYOUTS: Type<any>[] = [
  MhLayoutComponent,
  MhLayoutNavComponent,
  MhLayoutNavListComponent,
  MhLayoutManageListComponent,
  MhLayoutFooterComponent,

  MhNavigationDrawerComponent,
  MhNavigationDrawerMenuDirective
];

export { MhLayoutComponent, MhLayoutNavComponent, MhLayoutNavListComponent,
          MhLayoutManageListComponent, MhLayoutFooterComponent,
  MhNavigationDrawerComponent, MhNavigationDrawerMenuDirective };

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ScrollDispatchModule,
    MdSidenavModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdCardModule,
    MdListModule
  ],
  declarations: [
    TD_LAYOUTS
  ],
  exports: [
    TD_LAYOUTS
  ]
})
export class MHLayoutModule {

}
