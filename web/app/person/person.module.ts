import {NgModule} from '@angular/core';
import {CommonModule}  from '@angular/common';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule}   from '@angular/forms';

import {PersonComponent} from './person.component';
import {PersonListComponent} from './list/person-list.component';
import {PersonViewComponent} from './view/person-view.component';
import {PersonEditComponent} from './edit/person-edit.component';

import {PersonRelationsDialogComponent} from "./dialogs/person-relations.dialog";

import {PersonRoutingModule} from './person-routing.module';
import {PersonService} from "./person.service";

import {NoteListComponent} from '../note/list/note-list.component';
import {NoteService} from "../note/note.service";

@NgModule({
    declarations: [
        PersonComponent,
        PersonListComponent,
        PersonViewComponent,
        PersonEditComponent,
        NoteListComponent,
        PersonRelationsDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PersonRoutingModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        PersonService,
        NoteService
    ],
    entryComponents: [
        PersonRelationsDialogComponent
    ]
})
export class PersonModule {
}
