import {NgModule} from '@angular/core';
import {CommonModule}  from '@angular/common';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {PersonComponent} from './person.component';
import {PersonListComponent} from './list/person-list.component';
import {PersonViewComponent} from './view/person-view.component';
import {PersonEditComponent} from './edit/person-edit.component';

import {PersonRoutingModule} from './person-routing.module';
import {PersonService} from "./person.service";

import {MemoListComponent,MemoDialogComponent} from '../memo/list/memo-list.component';
import {MemoService} from "../memo/memo.service";

@NgModule({
    declarations: [
        PersonComponent,
        PersonListComponent,
        PersonViewComponent,
        PersonEditComponent,
        MemoListComponent,
        MemoDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PersonRoutingModule,
        FlexLayoutModule.forRoot(),
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        PersonService,
        MemoService
    ]
})
export class PersonModule {
}
