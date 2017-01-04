import {NgModule} from '@angular/core';
import {BrowserModule, Title}  from '@angular/platform-browser';

import {CovalentCoreModule} from '@covalent/core';


import {AppComponent} from './app.component';
import {AppRoutingModule}   from './app-routing.module';
import {TitleService}   from './common/title.service';


import {ButtonDisableFix} from '../directives/button-disable-fix.directive';

import {RequestInterceptor} from '../config/interceptors/request.interceptor';
import {LoginComponent} from "./login.component";
import {ViewComponent} from "./view.component";
import {CommonModule} from "./common/common.module";
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ViewComponent,
        // Bugfix for disabled anchor button in material.alpha-10 (remove in alpha-11)
        ButtonDisableFix,
    ], // directives, components, and pipes owned by this NgModule
    imports: [
        BrowserModule,
        CovalentCoreModule.forRoot(),
        AppRoutingModule,
        CommonModule
    ],
    providers: [
        Title
    ], // additional providers needed for this module
    bootstrap: [AppComponent],
})
export class AppModule {
}
