import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GeocodeService } from './services/geocode.service';
import { HttpService } from './services/http.service';
import { AuthService } from './modules/auth/auth.service';

export * from './services/index';
export * from './modules/auth/index';
export * from './modules/interaction/index';
export * from './modules/person/index';
export * from './modules/settings/index';
export * from './modules/tags/index';
export * from './modules/family/index';
export * from './common/index';

// export * from './store';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [],
  exports: [],
  providers: []
})
export class MhCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MhCoreModule,
      providers: [
          GeocodeService,
          HttpService,
          AuthService
      ]
    };
  }
}
