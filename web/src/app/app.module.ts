import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AppRoutingModule }   from './app-routing.module';
import { CommonModule } from './common/common.module';
import { SearchModule } from './search/search.module';
import { NoteModule } from './note/note.module';

import { LoginComponent } from './login/login.component';
import { ViewComponent } from './viewport/view.component';

import { PersonService } from './person/person.service';

import { StoreModule } from '@ngrx/store';
import { MHCoreModule } from 'mh-core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducer } from './app.store';

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
        MaterialModule,
        FlexLayoutModule,
        BrowserAnimationsModule,

        AppRoutingModule,
        MHCoreModule,
        StoreModule.provideStore(reducer),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),

        CommonModule,
        SearchModule,
        NoteModule
    ],
    providers: [
        PersonService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
