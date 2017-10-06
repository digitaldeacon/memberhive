import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title }  from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatExpansionModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatListModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule
} from '@angular/material';

import { GLOBALS } from '../../config/globals.config';

import { MhFadeDirective } from './animations/fade/fade.directive';
import { MhToggleDirective } from './animations/toggle/toggle.directive';

import { ShoutService } from './shout.service';
import { DialogService } from './dialog.service';

import { AuthGuard } from './auth-guard.service';
import { NotifyboxComponent } from './components/notifybox/notifybox.component';
import { FilterComponent } from './components/filter/filter.component';
import { ConfirmDialogComponent } from './components/confirm/confirm-dialog.component';

import { AgmCoreModule } from '@agm/core';
import { TagsComponent } from './components/tags/tags.component';

const MATERIAL_MODULES: any[] = [
    MatButtonModule, MatCardModule, MatIconModule,
    MatDatepickerModule, MatInputModule, MatMenuModule, MatListModule,
    MatExpansionModule, MatTooltipModule, MatNativeDateModule, MatSnackBarModule, MatSelectModule,
    MatToolbarModule, MatAutocompleteModule, MatChipsModule, MatFormFieldModule
];

@NgModule({
    declarations: [
        NotifyboxComponent,
        FilterComponent,
        ConfirmDialogComponent,
        MhFadeDirective,
        MhToggleDirective,
        TagsComponent
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
        TagsComponent,
        MATERIAL_MODULES,
        FlexLayoutModule,
        AgmCoreModule
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})

export class MHCommonModule {
}
