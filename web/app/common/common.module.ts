import { NgModule } from '@angular/core';
import { Title }  from '@angular/platform-browser';

import { LoginService } from "./auth/login.service";
import { TitleService } from "./title.service";
import { HttpService } from "./http.service";
import { ShoutService } from "./shout.service";

import { Ng2Webstorage } from 'ng2-webstorage';
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth-guard.service";

@NgModule({
    declarations: [], // directives, components, and pipes owned by this NgModule
    imports: [
        Ng2Webstorage.forRoot({prefix: 'mh', separator: '.'})
    ],
    providers: [
        Title,
        LoginService,
        TitleService,
        AuthService,
        HttpService,
        AuthGuard,
        ShoutService
    ],
    exports: []
})

export class CommonModule {
}
