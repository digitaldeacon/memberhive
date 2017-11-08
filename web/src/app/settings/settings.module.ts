import { Type, NgModule } from '@angular/core';
import { DragulaModule } from 'ng2-dragula';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MHCommonModule } from '../common/common.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

const NG_MODULES: Type<any>[] = [
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [
    MHCommonModule,
    NG_MODULES,
    SettingsRoutingModule,
    DragulaModule
  ],
  declarations: [
      SettingsComponent
  ]
})
export class SettingsModule {
  constructor() {
  }
}
