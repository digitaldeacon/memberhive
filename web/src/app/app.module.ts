import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule }   from './app-routing.module';
import { MHCommonModule } from './common/common.module';
import { SearchModule } from './search/search.module';
import { InteractionModule } from './interaction/interaction.module';

import { LoginComponent } from './login/login.component';
import { ViewComponent } from './viewport/view.component';

import { PersonService } from './person/person.service';

import { StoreModule, combineReducers, compose } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import {
    MHCoreModule,
    PersonEffects,
    SettingsEffects,
    AuthEffects } from 'mh-core';
import { reducers } from './app.store';

import 'hammerjs';

function debug(reducer): any {
    return function(state, action): any {
        console.log('state', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const debugReducerFactory: any = compose(debug, combineReducers);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ViewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        AppMaterialModule,
        BrowserAnimationsModule,

        AppMaterialModule,
        AppRoutingModule,
        MHCoreModule,

        // StoreModule.forRoot(reducers, { reducerFactory: debugReducerFactory }),
        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule,

        EffectsModule.forRoot([
            PersonEffects,
            AuthEffects,
            SettingsEffects
        ]),

        // !environment.prod ? StoreDevtoolsModule.instrument() : [],

        MHCommonModule,
        SearchModule,
        InteractionModule
    ],
    providers: [
        PersonService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
