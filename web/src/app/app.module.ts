import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
    DateAdapter,
    MatSidenavModule, MatProgressBarModule
} from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MhCommonModule } from './common/common.module';
import { SearchModule } from './search/search.module';
import { InteractionModule } from './interaction/interaction.module';

import { LoginComponent } from './login/login.component';
import { ViewComponent } from './viewport/view.component';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthService } from 'mh-core';

import {
    MhCoreModule,
    PersonEffects, SettingsEffects,
    InteractionEffects, TagEffects,
    FamilyEffects, AuthEffects } from 'mh-core';
import { reducers } from './app.store';

import {
    ToolbarInteractionsComponent
} from './viewport/components/interactions/toolbar-interactions/toolbar-interactions.component';

export interface AppConfig {
    token: string;
}

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
        HttpClientModule,
        AppRoutingModule,
        MhCoreModule.forRoot(),

        StoreModule.forRoot(reducers),
        // !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule,

        EffectsModule.forRoot([
            PersonEffects,
            AuthEffects,
            SettingsEffects,
            InteractionEffects,
            TagEffects,
            FamilyEffects
        ]),

        FormsModule,
        ReactiveFormsModule,

        MhCommonModule,
        MatSidenavModule,
        MatProgressBarModule,

        SearchModule,
        InteractionModule
    ],
    bootstrap: [AppComponent],
    providers: []
})

export class AppModule {
    constructor(private _http: HttpClient,
                private _auth: AuthService,
                private _dateAdapter: DateAdapter<Date>) {
        this._dateAdapter.setLocale('de-DE');
        if (!this._auth.client) {
            this._http.get<AppConfig>('assets/client.json')
                .toPromise()
                .then((config: AppConfig) => {
                    this._auth.client = config.token;
                });
        }
    }
}
