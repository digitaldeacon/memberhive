import {NgModule} from '@angular/core';
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
        MaterialModule.forRoot(),
        PersonRoutingModule,
    ],
    providers: [],
})
export class PersonModule {
}
