import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from './services/http.service';
import { AuthService } from './modules/auth/auth.service';
import { TitleService } from './services/title.service';
import { LoginService } from './services/login.service';
import { Ng2Webstorage } from 'ng2-webstorage';

@NgModule({
    declarations: [

    ],
    providers: [
        HttpService,
        AuthService,
        TitleService,
        LoginService
    ],
    exports: [

    ],
    imports: [
        BrowserModule,
        Ng2Webstorage.forRoot({prefix: 'mh', separator: '.'})
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class MHCoreModule {}
