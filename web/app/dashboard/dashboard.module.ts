import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DashboardRoutingModule } from './dashboard-routing.module';

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
}
