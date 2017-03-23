import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { NoteRoutingModule } from './note-routing.module';

import { NoteComponent } from './note.component';
import { NoteCreateComponent } from './create/note-create.component';
import { NoteListComponent } from './list/note-list.component';
import { NoteCreateDialogComponent } from './dialogs/note-create.dialog';

import { NoteService } from "./note.service";
import { TitleService } from "../common/title.service";

import { TinyMCEComponent } from '../common/tinymce/tinymce.component';

@NgModule({
    declarations: [
        NoteListComponent,
        TinyMCEComponent,
        NoteCreateDialogComponent,
        NoteCreateComponent,
        NoteComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        NoteRoutingModule
    ],
    providers: [
        NoteService
    ],
    exports: [
        NoteListComponent,
        TinyMCEComponent,
        NoteCreateDialogComponent
    ],
    entryComponents: [
        NoteCreateDialogComponent
    ]
})
export class NoteModule {
    constructor(titleService: TitleService) {
        titleService.changeModule('Interactions');
    }
}
