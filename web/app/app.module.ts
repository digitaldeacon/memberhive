import { NgModule } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';

import { CovalentCoreModule } from '@covalent/core';


import { AppComponent } from './app.component';
import { AppRoutingModule }   from './app-routing.module';


import { ButtonDisableFix } from '../directives/button-disable-fix.directive';

import { RequestInterceptor } from '../config/interceptors/request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    // Bugfix for disabled anchor button in material.alpha-10 (remove in alpha-11)
    ButtonDisableFix,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    CovalentCoreModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    Title,
  ], // additional providers needed for this module
  bootstrap: [ AppComponent ],
})
export class AppModule {}
