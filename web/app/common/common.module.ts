import {NgModule} from '@angular/core';

import {LoginService} from "./auth/login.service";
import {TitleService} from "./title.service";
import {Ng2Webstorage} from 'ng2-webstorage';

@NgModule({
    declarations: [
    ], // directives, components, and pipes owned by this NgModule
    imports: [
        Ng2Webstorage.forRoot({ prefix: 'mh', separator: '.' })
    ],
    providers: [
        LoginService,
        TitleService
    ],
    exports: [

    ]
})
export class CommonModule {
}

