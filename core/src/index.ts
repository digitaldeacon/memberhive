import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginService } from './services/login.service';
import { GeocodeService } from './services/geocode.service';
import { TitleService } from './services/title.service';
import { HttpService } from './services/http.service';
import { AuthService } from './modules/auth/auth.service';

import { Ng2Webstorage } from 'ngx-webstorage';

export * from './services';
export * from './modules/auth';
export * from './modules/interaction';
export * from './modules/person';
export * from './modules/settings';
export * from './modules/tags';
export * from './common';

@NgModule({
  imports: [
    BrowserModule,
    Ng2Webstorage.forRoot({prefix: 'mh', separator: '.'})
  ],
  declarations: [],
  exports: []
})
export class MHCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MHCoreModule,
      providers: [
          LoginService,
          GeocodeService,
          HttpService,
          TitleService,
          AuthService
      ]
    };
  }
}
