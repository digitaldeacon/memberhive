import { NgModule, LOCALE_ID, TRANSLATIONS,
    TRANSLATIONS_FORMAT, MissingTranslationStrategy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
    MatSidenavModule,
    MatProgressBarModule
} from '@angular/material';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MhCommonModule } from './common/common.module';
import { SearchModule } from './search/search.module';
import { InteractionModule } from './interaction/interaction.module';

import { LoginComponent } from './login/login.component';
import { ViewComponent } from './viewport/view.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { MhCoreModule } from 'mh-core';
import { I18n, MISSING_TRANSLATION_STRATEGY } from '@ngx-translate/i18n-polyfill';

import {
    ToolbarInteractionsComponent
} from './viewport/components/interactions/toolbar-interactions/toolbar-interactions.component';

declare const require;

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ViewComponent,
        ToolbarInteractionsComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {
            enabled: environment.production
        }),
        HttpClientModule,
        AppRoutingModule,
        MhCoreModule.forRoot(),
        !environment.production ? StoreDevtoolsModule.instrument() : [],

        MhCommonModule,
        MatSidenavModule,
        MatProgressBarModule,

        SearchModule,
        InteractionModule
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: LOCALE_ID, useValue: "de"},
        {
            provide: TRANSLATIONS,
            useFactory: (locale) => {
                console.log('using locale', locale);
                locale = locale || 'de';
                return require(`raw-loader!../i18n/messages.${locale}.xlf`);
            },
            deps: [LOCALE_ID]
        },
        // format of translations that you use
        {provide: TRANSLATIONS_FORMAT, useValue: "xlf"},
        {provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Error},
        I18n
    ]
})

export class AppModule {
    constructor(private _http: HttpClient) {
    }
}
