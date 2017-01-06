import {NgModule} from '@angular/core';
import {CommonModule}  from '@angular/common';
import {MaterialModule} from '@angular/material';

import {PersonComponent} from './person.component';
import {PersonListComponent} from './list/person-list.component';
import {PersonViewComponent} from './view/person-view.component';

import {PersonRoutingModule} from './person-routing.module';

@NgModule({
    declarations: [
        PersonComponent,
        PersonListComponent,
        PersonViewComponent
    ],
    imports: [
        CommonModule,
        MaterialModule.forRoot(),
        PersonRoutingModule,
    ],
    providers: [],
})
export class PersonModule {
}
