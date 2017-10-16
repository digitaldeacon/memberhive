import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MHCommonModule } from '../common/common.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';
import { DragulaModule } from 'ng2-dragula';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashletEditDialogComponent } from './dashlets/birthday/dashlet-birthdays-edit.dialog';
import { DashletBirthdaysComponent } from './dashlets/birthday/dashlet-birthdays.component';

import { DashletInteractionsComponent } from './dashlets/interactions/dashlet-interactions.component';

@NgModule({
    declarations: [
        DashboardComponent,
        DashletBirthdaysComponent,
        DashletEditDialogComponent,
        DashletInteractionsComponent
    ],
    imports: [
        CommonModule,
        MHCommonModule,
        DashboardRoutingModule,
        FlexLayoutModule,
        MomentModule,
        DragulaModule
    ],
    providers: [
    ],
    entryComponents: [
        DashletEditDialogComponent
    ]
})
export class DashboardModule {}
