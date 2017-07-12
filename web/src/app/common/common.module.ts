import { NgModule } from '@angular/core';
import { Title }  from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    CompatibilityModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    StyleModule,
    MdCoreModule,
    MdDatepickerModule,
    MdInputModule,
    MdMenuModule,
    MdExpansionModule
} from '@angular/material';

import { GLOBALS } from '../../config/globals.config';

import { MHLayoutModule } from '../layout/layout.module';
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
    CompatibilityModule, MdButtonModule, MdCardModule, MdIconModule,
    MdDatepickerModule, StyleModule, MdCoreModule, MdInputModule, MdMenuModule,
    MdExpansionModule
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
        MHLayoutModule,
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
        MHLayoutModule,
        FlexLayoutModule,
        AgmCoreModule
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})

export class MHCommonModule {
}
