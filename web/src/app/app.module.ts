import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { DateAdapter, MATERIAL_COMPATIBILITY_MODE } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {
    MatSidenavModule,
    MatProgressBarModule
} from '@angular/material';

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
    MHCoreModule,
    PersonEffects,
    SettingsEffects,
    InteractionEffects,
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
        MHCoreModule.forRoot(),

        StoreModule.forRoot(reducers),
        !environment.prod ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule,

        EffectsModule.forRoot([
            PersonEffects,
            AuthEffects,
            SettingsEffects,
            InteractionEffects
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
    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('de-DE');
    }
}
