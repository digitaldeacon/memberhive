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

import { MHLayoutModule } from '../layout/layout.module';
import { MhFadeDirective } from './animations/fade/fade.directive';
import { MhToggleDirective } from './animations/toggle/toggle.directive';

import { ShoutService } from './shout.service';
import { InteractionService } from './interaction.service';

import { AuthGuard } from './auth-guard.service';
import { NotifyboxComponent } from './components/notifybox/notifybox.component';
import { FilterComponent } from './components/filter/filter.component';

const MATERIAL_MODULES: any[] = [
    CompatibilityModule, MdButtonModule, MdCardModule, MdIconModule,
    MdDatepickerModule, StyleModule, MdCoreModule, MdInputModule, MdMenuModule,
    MdExpansionModule
];

@NgModule({
    declarations: [
        NotifyboxComponent,
        FilterComponent,
        MhFadeDirective,
        MhToggleDirective
    ], // directives, components, and pipes owned by this NgModule
    imports: [
        MATERIAL_MODULES,
        MHLayoutModule,
        FlexLayoutModule
    ],
    providers: [
        Title,
        AuthGuard,
        ShoutService,
        InteractionService
    ],
    exports: [
        NotifyboxComponent,
        FilterComponent,
        MATERIAL_MODULES,
        MHLayoutModule,
        FlexLayoutModule
    ]
})

export class MHCommonModule {
}
