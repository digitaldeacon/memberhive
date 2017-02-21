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
import { AvatarEditDialogComponent } from "./dialogs/avatar-edit.dialog";

import { PersonRoutingModule } from './person-routing.module';
import { PersonService } from "./person.service";

import { ShoutService } from "../common/shout.service";
import { ImageCropperComponent } from 'ng2-img-cropper';

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
        ImageCropperComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        PersonRoutingModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        NoteModule,
        CovalentFileModule.forRoot()
    ],
    providers: [
        PersonService,
        ShoutService
    ],
    entryComponents: [
        PersonRelationsDialogComponent,
        AvatarEditDialogComponent
    ]
})
export class PersonModule {
    constructor(titleService: TitleService) {
        titleService.changeModule('Persons');
    }
}
