import {NgModule} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {BrowserModule}  from '@angular/platform-browser';
import {MaterialModule} from '@angular/material';
import {HttpModule} from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {AppRoutingModule}   from './app-routing.module';
import {CommonModule} from './common/common.module';

import {LoginComponent} from './login.component';
import {ViewComponent} from './view.component';
import {SearchModule} from "./search/search.module";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ViewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,

        FlexLayoutModule.forRoot(),

        AppRoutingModule,

        CommonModule,
        SearchModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}
