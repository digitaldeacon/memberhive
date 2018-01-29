import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';
import { I18n } from '@ngx-translate/i18n-polyfill';

import { GeocodeService } from './services/geocode.service';
import { HttpService } from './services/http.service';
import { AuthService } from './modules/auth/auth.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store';

import { PersonEffects } from './modules/person/person.effects';
import { SettingsEffects } from './modules/settings/settings.effects';
import { InteractionEffects } from  './modules/interaction/interaction.effects';
import { TagEffects } from './modules/tags/tag.effects';
import { FamilyEffects } from './modules/family/family.effects';
import { AuthEffects } from './modules/auth/auth.effects';

import { AuthInterceptor } from './modules/auth/auth.interceptor';

export * from './services/index';
export * from './modules/auth/index';
export * from './modules/interaction/index';
export * from './modules/person/index';
export * from './modules/settings/index';
export * from './modules/tags/index';
export * from './modules/family/index';
export * from './common/index';

export * from './store';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
        PersonEffects,
        AuthEffects,
        SettingsEffects,
        InteractionEffects,
        TagEffects,
        FamilyEffects
    ])
  ],
  declarations: [],
  exports: [],
  providers: [
      TitleCasePipe,
      I18n
  ]
})
export class MhCoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MhCoreModule,
      providers: [
          GeocodeService,
          HttpService,
          AuthService,
          I18n,
          {
              provide: HTTP_INTERCEPTORS,
              useClass: AuthInterceptor,
              multi: true
          }
      ]
    };
  }
}
