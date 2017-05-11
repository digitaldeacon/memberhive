import { NgModule } from '@angular/core';
import { Title }  from '@angular/platform-browser';

import {
    CompatibilityModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    StyleModule,
    MdCoreModule
} from '@angular/material';

import { ShoutService } from './shout.service';
import { InteractionService } from './interaction.service';

import { KeysPipe } from './keys.pipe';

import { Ng2Webstorage } from 'ng2-webstorage';
import { AuthGuard } from './auth-guard.service';
import { NotifyboxComponent } from './components/notifybox/notifybox.component';

@NgModule({
    declarations: [
        NotifyboxComponent
    ], // directives, components, and pipes owned by this NgModule
    imports: [
        Ng2Webstorage.forRoot({prefix: 'mh', separator: '.'}),
        CompatibilityModule,
        MdButtonModule,
        MdCardModule,
        MdIconModule,
        StyleModule,
        MdCoreModule
    ],
    providers: [
        Title,
        AuthGuard,
        ShoutService,
        InteractionService
    ],
    exports: [
        NotifyboxComponent,
        CompatibilityModule,
        MdButtonModule,
        MdCardModule,
        MdIconModule,
        StyleModule,
        MdCoreModule
    ]
})

export class CommonModule {
}
