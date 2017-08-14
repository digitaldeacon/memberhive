import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { AppMaterialModule } from './app-material.module';
import { DateAdapter } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule }   from './app-routing.module';
import { MHCommonModule } from './common/common.module';
import { SearchModule } from './search/search.module';
import { InteractionModule } from './interaction/interaction.module';

import { LoginComponent } from './login/login.component';
import { ViewComponent } from './viewport/view.component';

import { StoreModule, combineReducers, compose } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
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

import { ToolbarInteractionsComponent } from './viewport/components/interactions/toolbar-interactions/toolbar-interactions.component';

/*function debug(reducer): any {
    return function(state, action): any {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}
export const debugReducerFactory: any = compose(debug, combineReducers);*/

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
        MHCoreModule,

        // StoreModule.forRoot(reducers, { reducerFactory: debugReducerFactory }),
        StoreModule.forRoot(reducers),
        !environment.prod ? StoreDevtoolsModule.instrument() : [],

        // StoreRouterConnectingModule,

        EffectsModule.forRoot([
            PersonEffects,
            AuthEffects,
            SettingsEffects,
            InteractionEffects
        ]),

        FormsModule,
        ReactiveFormsModule,

        AppMaterialModule,
        MHCommonModule,

        SearchModule,
        InteractionModule
    ],
    bootstrap: [AppComponent]
    // providers: [{provide: DateAdapter, useClass: CustomDateAdapter }]
})

export class AppModule {
    constructor(private dateAdapter: DateAdapter<Date>) {
        this.dateAdapter.setLocale('de-DE');
    }
}
