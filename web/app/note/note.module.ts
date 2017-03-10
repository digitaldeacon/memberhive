import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { NoteListComponent } from './list/note-list.component';
import { NoteService } from "./note.service";
import { TinyMCEComponent } from '../common/tinymce/tinymce.component';

@NgModule({
    declarations: [
        NoteListComponent,
        TinyMCEComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        NoteService
    ],
    exports: [
        NoteListComponent,
        TinyMCEComponent
    ]
})
export class NoteModule {
}
