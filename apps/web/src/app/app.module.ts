import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NxModule } from "@nrwl/nx";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MatSidenavModule, MatProgressBarModule } from "@angular/material";
import { MAT_DATE_LOCALE, DateAdapter } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { ServiceWorkerModule } from "@angular/service-worker";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { MhCommonModule } from "./common/common.module";
import { SearchModule } from "./search/search.module";
import { InteractionModule } from "./interaction/interaction.module";

import { LoginComponent } from "./login/login.component";
import { ViewComponent } from "./viewport/view.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";

import { MhCoreModule } from "@memberhivex/core";

import { ToolbarInteractionsComponent } from "./viewport/components/interactions/toolbar-interactions/toolbar-interactions.component";

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
    NxModule.forRoot(),
    /*ServiceWorkerModule.register('/ngsw-worker.js', {
            enabled: environment.production
        }),*/
    HttpClientModule,
    AppRoutingModule,
    MhCoreModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    MhCommonModule,
    MatSidenavModule,
    MatProgressBarModule,

    SearchModule,
    InteractionModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule {
  constructor() {}
}
