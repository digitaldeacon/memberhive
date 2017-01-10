import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';
import {DashboardComponent} from './dashboard.component';

import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        MaterialModule.forRoot(),
        DashboardRoutingModule
    ]
})
export class DashboardModule {
}
