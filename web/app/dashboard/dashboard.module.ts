import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { TitleService } from "../common/title.service";

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        MaterialModule,
        DashboardRoutingModule,
        FlexLayoutModule
    ]
})
export class DashboardModule {
    constructor(titleService: TitleService) {
        titleService.changeModule('Dashboard');
    }
}
