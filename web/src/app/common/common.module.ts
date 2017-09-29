import { NgModule } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    CompatibilityModule,
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
    MatToolbarModule
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

const MATERIAL_MODULES: any[] = [
    CompatibilityModule, MatButtonModule, MatCardModule, MatIconModule,
    MatDatepickerModule, MatInputModule, MatMenuModule, MatListModule,
    MatExpansionModule, MatTooltipModule, MatNativeDateModule, MatSnackBarModule, MatSelectModule,
    MatToolbarModule
];

@NgModule({
    declarations: [
        NotifyboxComponent,
        FilterComponent,
        ConfirmDialogComponent,
        MhFadeDirective,
        MhToggleDirective
    ], // directives, components, and pipes owned by this NgModule
    imports: [
        MATERIAL_MODULES,
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
