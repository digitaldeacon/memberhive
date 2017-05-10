import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth/auth.service';
// import { AuthGuard } from './modules/auth/auth.guard';
import { TitleService } from './services/title.service';
import { LoginService } from './services/auth/login.service';
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
