import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';

import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule }   from './app-routing.module';
import { CommonModule } from './common/common.module';
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

function debug(state, action) {
    console.log('state', state);
    console.log('action', action);

    return state;
}

// const debugReducerFactory: any = compose(debug, combineReducers);

import {
    MHCoreModule,
    PersonEffects,
    AuthEffects } from 'mh-core';
import { reducers } from './app.store';

import 'hammerjs';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ViewComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        FlexLayoutModule,

        AppMaterialModule,
        AppRoutingModule,
        MHCoreModule,

        StoreModule.forRoot(reducers),
        StoreRouterConnectingModule,
        // !environment.prod ? StoreDevtoolsModule.instrument() : [],

        EffectsModule.forRoot(),
        EffectsModule.run(PersonEffects),
        EffectsModule.run(AuthEffects),

        CommonModule,
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
