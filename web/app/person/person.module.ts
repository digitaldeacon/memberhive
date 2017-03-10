import { NgModule } from '@angular/core';
import { CommonModule, DatePipe }  from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { NoteModule } from "../note/note.module";
import { AuditModule } from "../audit/audit.module";

import { PersonComponent } from './person.component';
import { PersonListComponent } from './list/person-list.component';
import { PersonViewComponent } from './view/person-view.component';
import { PersonEditComponent } from './edit/person-edit.component';

import { PersonRelationsDialogComponent } from "./dialogs/person-relations.dialog";
import { AvatarEditDialogComponent } from "./dialogs/avatar-edit.dialog";
import { NoteCreateDialogComponent } from '../note/dialogs/note-create.dialog';

import { PersonRoutingModule } from './person-routing.module';
import { PersonService } from "./person.service";

import { ShoutService } from "../common/shout.service";
import { ImageCropperModule } from 'ng2-img-cropper';

import { CovalentFileModule } from '@covalent/core';

import { TitleService } from "../common/title.service";

@NgModule({
    declarations: [
        PersonComponent,
        PersonListComponent,
        PersonViewComponent,
        PersonEditComponent,
        PersonRelationsDialogComponent,
        AvatarEditDialogComponent,
        NoteCreateDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PersonRoutingModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        NoteModule,
        AuditModule,
        ImageCropperModule,
        CovalentFileModule.forRoot()
    ],
    providers: [
        PersonService,
        ShoutService,
        DatePipe
    ],
    entryComponents: [
        PersonRelationsDialogComponent,
        AvatarEditDialogComponent,
        NoteCreateDialogComponent
    ]
})
export class PersonModule {
    constructor(titleService: TitleService) {
        titleService.changeModule('Persons');
    }
}
