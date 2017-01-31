import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { getTranslationProviders } from './i18n-providers';
import { AppModule } from './app/app.module';

getTranslationProviders().then(providers => {
  const options = { providers };
  platformBrowserDynamic().bootstrapModule(AppModule, options);
});


if (environment.production) {
  enableProdMode();
}

//platformBrowserDynamic().bootstrapModule(AppModule);
