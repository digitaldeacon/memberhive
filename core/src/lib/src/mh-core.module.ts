import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GeocodeService } from './services/geocode.service';
import { HttpService } from './services/http.service';
import { AuthService } from './modules/auth/auth.service';

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
