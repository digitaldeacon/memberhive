import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { NoteModule } from "../note/note.module";

import { PersonComponent } from './person.component';
import { PersonListComponent } from './list/person-list.component';
import { PersonViewComponent } from './view/person-view.component';
import { PersonEditComponent } from './edit/person-edit.component';

import { PersonRelationsDialogComponent } from "./dialogs/person-relations.dialog";

import { PersonRoutingModule } from './person-routing.module';
import { PersonService } from "./person.service";

import {ShoutService} from "../common/shout.service";

@NgModule({
    declarations: [
        PersonComponent,
        PersonListComponent,
        PersonViewComponent,
        PersonEditComponent,
        PersonRelationsDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PersonRoutingModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        NoteModule
    ],
    providers: [
        PersonService,
        ShoutService
    ],
    entryComponents: [
        PersonRelationsDialogComponent
    ]
})
export class PersonModule {
}
