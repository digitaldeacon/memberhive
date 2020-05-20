import { Type, NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MhCommonModule } from '../common/common.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-img-cropper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';

import { InteractionModule } from '../interaction/interaction.module';
import { AuditModule } from '../audit/audit.module';

import { KeysPipe } from '../common/keys.pipe';

import { PersonComponent } from './person.component';
import { PersonListComponent } from './list/person-list.component';
import { PersonViewComponent } from './view/person-view.component';
import { PersonFormComponent } from './form/person-form.component';
import { PersonCreateComponent } from './create/person-create.component';
import { PeopleMapComponent } from './map/people-map.component';

import { PersonRelationsDialogComponent } from './dialogs/person-relations.dialog';
import { AvatarEditDialogComponent } from './dialogs/avatar-edit.dialog';
import { MapDialogComponent } from './dialogs/map/map.dialog';

import { PersonRoutingModule } from './person-routing.module';

import { ShoutService } from '../common/shout.service';
import { FamilyComponent } from './components/family/family.component';
import { FamilyTileComponent } from './components/family/family-tile.component';

const NG_MODULES: Type<any>[] = [FlexLayoutModule, FormsModule, ReactiveFormsModule];

const MH_MODULES: Type<any>[] = [MhCommonModule, PersonRoutingModule, InteractionModule, AuditModule];

const MAT_MODULES: Type<any>[] = [MatRadioModule, MatCheckboxModule, MatTabsModule];

const MH_COMPONENTS: Type<any>[] = [
  PersonComponent,
  PersonListComponent,
  PersonViewComponent,
  PersonFormComponent,
  PersonCreateComponent,
  PeopleMapComponent,
  PersonRelationsDialogComponent,
  AvatarEditDialogComponent,
  MapDialogComponent,
  FamilyComponent,
  FamilyTileComponent
];

@NgModule({
  declarations: [KeysPipe, MH_COMPONENTS],
  imports: [NG_MODULES, MH_MODULES, MAT_MODULES, ImageCropperModule],
  providers: [ShoutService, DatePipe, KeysPipe],
  entryComponents: [PersonRelationsDialogComponent, AvatarEditDialogComponent, MapDialogComponent]
})
export class PersonModule {
  constructor() {}
}
