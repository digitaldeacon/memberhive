import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCardModule, MatDialogModule,
    MatButtonModule, MatButtonToggleModule,
    MatIconModule, MatMenuModule,
    MatSelectModule, MatTooltipModule,
    MatToolbarModule, MatInputModule,
    MatDatepickerModule, MatChipsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { InteractionRoutingModule } from './interaction-routing.module';

import { InteractionComponent } from './interaction.component';
import { InteractionFormComponent } from './form/interaction-form.component';
import { InteractionListComponent } from './list/interaction-list.component';

import { TinyMCEComponent } from '../common/tinymce/tinymce.component';
import { ViewComponent } from './view/view.component';

@NgModule({
    declarations: [
        InteractionListComponent,
        TinyMCEComponent,
        InteractionFormComponent,
        InteractionComponent,
        ViewComponent
    ],
    imports: [
        CommonModule,

        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatTooltipModule,
        MatInputModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatChipsModule,

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
    constructor() {
    }
}
