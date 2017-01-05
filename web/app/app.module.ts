import {NgModule} from '@angular/core';
import {BrowserModule, Title}  from '@angular/platform-browser';
import {CovalentCoreModule} from '@covalent/core';

import {AppComponent} from './app.component';
import {AppRoutingModule}   from './app-routing.module';

import {RequestInterceptor} from '../config/interceptors/request.interceptor';
import {LoginComponent} from "./login.component";
import {ViewComponent} from "./view.component";
import {CommonModule} from "./common/common.module";
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ViewComponent,
    ],
    imports: [
        BrowserModule,
        CovalentCoreModule.forRoot(),
        AppRoutingModule,
        CommonModule
    ],
    providers: [
        Title
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
