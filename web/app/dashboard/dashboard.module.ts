import {NgModule} from '@angular/core';
import {Title}  from '@angular/platform-browser';
import {DashboardComponent} from './dashboard.component';

import {DashboardRoutingModule} from './dashboard-routing.module';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        DashboardRoutingModule,
    ],
    providers: [
        Title,
    ],
})
export class DashboardModule {
}
