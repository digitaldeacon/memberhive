import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {
    DateAdapter, MATERIAL_COMPATIBILITY_MODE,
    MatSidenavModule,
    MatProgressBarModule
} from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppComponent } from './app.component';
import { AppRoutingModule }   from './app-routing.module';
import { MHCommonModule } from './common/common.module';
import { SearchModule } from './search/search.module';
import { InteractionModule } from './interaction/interaction.module';

import { LoginComponent } from './login/login.component';
import { ViewComponent } from './viewport/view.component';

import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

// import { CustomDateAdapter } from './custom-date.adaptor';

import {
    MhCoreModule,
    PersonEffects,
    SettingsEffects,
    InteractionEffects,
    TagEffects,
    AuthEffects } from 'mh-core';
import { reducers } from './app.store';

import {
    ToolbarInteractionsComponent
} from './viewport/components/interactions/toolbar-interactions/toolbar-interactions.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ViewComponent,
        ToolbarInteractionsComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        AppRoutingModule,
        MhCoreModule.forRoot(),

        StoreModule.forRoot(reducers),
        // !environment.prod ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule,

        EffectsModule.forRoot([
            PersonEffects,
            AuthEffects,
            SettingsEffects,
            InteractionEffects,
            TagEffects
        ]),

        FormsModule,
        ReactiveFormsModule,

        MHCommonModule,
        MatSidenavModule,
        MatProgressBarModule,

        SearchModule,
        InteractionModule
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
    ]
})

export class AppModule {
    constructor(private _http: Http,
                private _dateAdapter: DateAdapter<Date>) {
        this._dateAdapter.setLocale('de-DE');
        if (localStorage.getItem('clientToken') === undefined) {
            this._http.get('assets/client.json')
                .map(res => res.json())
                .toPromise()
                .then((config) => {
                    console.log('Setting storage item');
                    localStorage.setItem('clientToken', config.token);
                });
        }
    }
}
