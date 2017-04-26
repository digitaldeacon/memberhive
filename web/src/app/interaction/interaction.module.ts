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
    MdInputModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { InteractionRoutingModule } from './interaction-routing.module';

import { InteractionComponent } from './interaction.component';
import { InteractionCreateComponent } from './create/interaction-create.component';
import { InteractionListComponent } from './list/interaction-list.component';
import { InteractionCreateDialogComponent } from './dialogs/interaction-create.dialog';

import { InteractionService } from "./interaction.service";
import { TitleService } from "../common/title.service";

import { TinyMCEComponent } from '../common/tinymce/tinymce.component';

@NgModule({
    declarations: [
        InteractionListComponent,
        TinyMCEComponent,
        InteractionCreateDialogComponent,
        InteractionCreateComponent,
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

        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        InteractionRoutingModule
    ],
    providers: [
        InteractionService
    ],
    exports: [
        InteractionListComponent,
        TinyMCEComponent,
        InteractionCreateDialogComponent
    ],
    entryComponents: [
        InteractionCreateDialogComponent
    ]
})
export class InteractionModule {
    constructor(titleService: TitleService) {
        titleService.changeModule('Interactions');
    }
}
