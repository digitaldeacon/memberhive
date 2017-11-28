import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
    MatSidenavModule,
    MatProgressBarModule
} from '@angular/material';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MhCommonModule } from './common/common.module';
import { SearchModule } from './search/search.module';
import { InteractionModule } from './interaction/interaction.module';

import { LoginComponent } from './login/login.component';
import { ViewComponent } from './viewport/view.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthService } from 'mh-core';

import { MhCoreModule } from 'mh-core';

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
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        FormsModule,
        ReactiveFormsModule,

        MhCommonModule,
        MatSidenavModule,
        MatProgressBarModule,

        SearchModule,
        InteractionModule
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        { provide: LOCALE_ID, useValue: 'de' }
    ]
})

export class AppModule {
    constructor(private _http: HttpClient,
                private _auth: AuthService) {
        if (!this._auth.client) {
            this._http.get<AppConfig>('assets/client.json')
                .map((config: AppConfig) => {
                    this._auth.client = config.token;
                });
        }
    }
}
