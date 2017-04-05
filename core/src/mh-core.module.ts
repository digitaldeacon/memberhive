import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth/auth.service';
import { TitleService } from './services/title.service'

@NgModule({
    declarations: [

    ],
    providers: [
        HttpService,
        AuthService,
        TitleService
    ],
    exports: [

    ],
    imports: [
        BrowserModule
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class MHCoreModule {}
