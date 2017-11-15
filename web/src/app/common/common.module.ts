import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule, MatCardModule, MatDialogModule,
    MatIconModule, MatDatepickerModule, MatProgressSpinnerModule,
    MatInputModule, MatMenuModule,
    MatSelectModule, MatExpansionModule,
    MatTooltipModule, MatNativeDateModule,
    MatSnackBarModule, MatListModule,
    MatToolbarModule, MatAutocompleteModule,
    MatChipsModule, MatFormFieldModule, MatCheckboxModule
} from '@angular/material';

import { GLOBALS } from '../../config/globals.config';

import { ShoutService } from './shout.service';
import { DialogService } from './dialog.service';
import { AuthGuard } from './auth-guard.service';

import { NotifyboxComponent } from './components/notifybox/notifybox.component';
import { FilterComponent } from './components/filter/filter.component';
import { ConfirmDialogComponent } from './components/confirm/confirm-dialog.component';

import { AgmCoreModule } from '@agm/core';
import { MhTagsComponent } from './components/tags/tags.component';

const MATERIAL_MODULES: any[] = [
    MatButtonModule, MatCardModule, MatIconModule, MatDialogModule,
    MatDatepickerModule, MatInputModule, MatMenuModule, MatListModule,
    MatExpansionModule, MatTooltipModule, MatNativeDateModule, MatSnackBarModule, MatSelectModule,
    MatToolbarModule, MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatCheckboxModule,
    MatProgressSpinnerModule
];

@NgModule({
    declarations: [
        NotifyboxComponent,
        FilterComponent,
        ConfirmDialogComponent,
        MhTagsComponent
    ], // directives, components, and pipes owned by this NgModule
    imports: [
        MATERIAL_MODULES,
        CommonModule,
        FlexLayoutModule,
        AgmCoreModule.forRoot({
            apiKey: GLOBALS.googleAPIKey
        })
    ],
    providers: [
        Title,
        AuthGuard,
        ShoutService,
        DialogService
    ],
    exports: [
        NotifyboxComponent,
        FilterComponent,
        ConfirmDialogComponent,
        MhTagsComponent,
        MATERIAL_MODULES,
        CommonModule,
        FlexLayoutModule,
        AgmCoreModule
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})

export class MhCommonModule {
}
