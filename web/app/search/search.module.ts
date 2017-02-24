import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from '@angular/flex-layout';

import { SearchBoxComponent } from './search-box.component';
import { SearchService } from "./search.service";


@NgModule({
    declarations: [
        SearchBoxComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        SearchService
    ],
    exports: [
        SearchBoxComponent
    ]
})
export class SearchModule {
}
