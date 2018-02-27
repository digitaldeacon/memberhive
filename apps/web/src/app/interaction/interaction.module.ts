import { NgModule } from '@angular/core';
import { MhCommonModule } from '../common/common.module';
import { MatButtonToggleModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InteractionRoutingModule } from './interaction-routing.module';

import { InteractionComponent } from './interaction.component';
import { InteractionFormComponent } from './form/interaction-form.component';
import { InteractionListComponent } from './list/interaction-list.component';

import { TinyMCEComponent } from '../common/components/tinymce/tinymce.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    InteractionListComponent,
    TinyMCEComponent,
    InteractionFormComponent,
    InteractionComponent,
    ViewComponent
  ],
  imports: [MhCommonModule, MatButtonToggleModule, FormsModule, ReactiveFormsModule, InteractionRoutingModule],
  exports: [InteractionListComponent, TinyMCEComponent],
  entryComponents: []
})
export class InteractionModule {
  constructor() {}
}
