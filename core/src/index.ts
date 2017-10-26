import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GeocodeService } from './services/geocode.service';
import { HttpService } from './services/http.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

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
    JwtModule.forRoot({
        config: {
            whitelistedDomains: ['localhost:4200','memberhive.com']
        }
    }),
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
          GeocodeService,
          HttpService,
          AuthService,
          JwtHelperService
      ]
    };
  }
}
