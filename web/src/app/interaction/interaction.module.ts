import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import {
    MdCardModule,
    MdDialogModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdIconModule,
    MdMenuModule,
    MdSelectModule,
    MdTooltipModule,
    MdInputModule,
    MdDatepickerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { InteractionRoutingModule } from './interaction-routing.module';

import { InteractionComponent } from './interaction.component';
import { InteractionFormComponent } from './form/interaction-form.component';
import { InteractionListComponent } from './list/interaction-list.component';

import { TitleService } from 'mh-core';

import { TinyMCEComponent } from '../common/tinymce/tinymce.component';

@NgModule({
    declarations: [
        InteractionListComponent,
        TinyMCEComponent,
        InteractionFormComponent,
        InteractionComponent
    ],
    imports: [
        CommonModule,

        MdCardModule,
        MdDialogModule,
        MdButtonModule,
        MdIconModule,
        MdMenuModule,
        MdSelectModule,
        MdButtonToggleModule,
        MdTooltipModule,
        MdInputModule,
        MdDatepickerModule,

        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        InteractionRoutingModule
    ],
    exports: [
        InteractionListComponent,
        TinyMCEComponent
    ],
    entryComponents: [
    ]
})
export class InteractionModule {
    constructor(titleService: TitleService) {
        titleService.changeModule('Interactions');
    }
}
