import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MHCommonModule } from '../common/common.module';
import {
    MatAutocompleteModule
} from '@angular/material';

import { SearchBoxComponent } from './search-box.component';
import { SearchService } from './search.service';

@NgModule({
    declarations: [
        SearchBoxComponent
    ],
    imports: [
        CommonModule,
        MHCommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatAutocompleteModule
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
