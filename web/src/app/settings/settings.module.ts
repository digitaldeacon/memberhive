import { Type, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MHCommonModule } from '../common/common.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

import { TitleService } from '../common/title.service';

const NG_MODULES: Type<any>[] = [
  CommonModule,
  FlexLayoutModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [
    NG_MODULES,
    SettingsRoutingModule,
    MHCommonModule,
    DragulaModule
  ],
  declarations: [
      SettingsComponent
  ]
})
export class SettingsModule {
  constructor(titleService: TitleService) {
    titleService.changeModule('Settings');
  }
}
