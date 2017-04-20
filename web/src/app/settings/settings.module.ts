import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragulaModule } from 'ng2-dragula';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppMaterialModule } from '../app-material.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

import { TitleService } from 'mh-core';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    AppMaterialModule,
    DragulaModule,
    FlexLayoutModule
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
