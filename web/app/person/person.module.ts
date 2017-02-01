import {NgModule} from '@angular/core';
import {CommonModule}  from '@angular/common';
import {MaterialModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import {PersonComponent} from './person.component';
import {PersonListComponent} from './list/person-list.component';
import {PersonViewComponent} from './view/person-view.component';

import {PersonRoutingModule} from './person-routing.module';
import {PersonService} from "./person.service";

@NgModule({
    declarations: [
        PersonComponent,
        PersonListComponent,
        PersonViewComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PersonRoutingModule,
        FlexLayoutModule.forRoot()
    ],
    providers: [
        PersonService
    ]
})
export class PersonModule {
}
