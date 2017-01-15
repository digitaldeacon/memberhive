import {NgModule} from '@angular/core';
import {CommonModule}  from '@angular/common';
import {MaterialModule} from '@angular/material';

import {SearchBoxComponent} from './search-box.component';

import {SearchService} from "./search.service";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        SearchBoxComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule
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
