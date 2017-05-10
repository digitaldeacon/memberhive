import { NgModule } from '@angular/core';
import { Title }  from '@angular/platform-browser';

import { ShoutService } from './shout.service';
import { InteractionService } from './interaction.service';

import { KeysPipe } from './keys.pipe';

import { Ng2Webstorage } from 'ng2-webstorage';
import { AuthGuard } from './auth-guard.service';

@NgModule({
    declarations: [

    ], // directives, components, and pipes owned by this NgModule
    imports: [
        Ng2Webstorage.forRoot({prefix: 'mh', separator: '.'})
    ],
    providers: [
        Title,
        AuthGuard,
        ShoutService,
        InteractionService
    ],
    exports: [

    ]
})

export class CommonModule {
}
