import {NgModule} from '@angular/core';

import {LoginService} from "./auth/login.service";
import {TitleService} from "./title.service";
import {HttpService} from "./http.service";
import {Ng2Webstorage} from 'ng2-webstorage';
import {AuthService} from "./auth/auth.service";

@NgModule({
    declarations: [], // directives, components, and pipes owned by this NgModule
    imports: [
        Ng2Webstorage.forRoot({prefix: 'mh', separator: '.'})
    ],
    providers: [
        LoginService,
        TitleService,
        AuthService,
        HttpService

    ],
    exports: []
})
export class CommonModule {
}

