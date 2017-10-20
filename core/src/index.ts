import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LoginService } from './services/login.service';
import { GeocodeService } from './services/geocode.service';
import { HttpService } from './services/http.service';
import { AuthService } from './modules/auth/auth.service';

import { Ng2Webstorage } from 'ngx-webstorage';

export * from './services/index';
export * from './modules/auth/index';
export * from './modules/interaction/index';
export * from './modules/person/index';
export * from './modules/settings/index';
export * from './modules/tags/index';
export * from './common/index';

@NgModule({
  imports: [
    BrowserModule,
    Ng2Webstorage.forRoot({prefix: 'mh', separator: '.'})
  ],
  declarations: [],
  exports: []
})
export class MhCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MhCoreModule,
      providers: [
          LoginService,
          GeocodeService,
          HttpService,
          AuthService
      ]
    };
  }
}
