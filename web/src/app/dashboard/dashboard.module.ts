import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashletEditDialogComponent } from './dashlets/birthday/dashlet-birthdays-edit.dialog';
import { DashletBirthdaysComponent } from './dashlets/birthday/dashlet-birthdays.component';

import { DashletInteractionsComponent } from './dashlets/interactions/dashlet-interactions.component';

import { TitleService } from '../common/title.service';
import { PersonService } from '../person/person.service';

@NgModule({
    declarations: [
        DashboardComponent,
        DashletBirthdaysComponent,
        DashletEditDialogComponent,
        DashletInteractionsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        DashboardRoutingModule,
        FlexLayoutModule,
        MomentModule
    ],
    providers: [
        PersonService
    ],
    entryComponents: [
        DashletEditDialogComponent
    ]
})
export class DashboardModule {
    constructor(titleService: TitleService) {
        titleService.changeModule('Dashboard');
    }
}
