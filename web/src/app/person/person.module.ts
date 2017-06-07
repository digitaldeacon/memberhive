import { Type, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MHCommonModule } from '../common/common.module';
import { AppMaterialModule } from '../app-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InteractionModule } from '../interaction/interaction.module';
import { AuditModule } from '../audit/audit.module';

import { KeysPipe } from '../common/keys.pipe';

import { PersonComponent } from './person.component';
import { PersonListComponent } from './list/person-list.component';
import { PersonViewComponent } from './view/person-view.component';
import { PersonEditComponent } from './edit/person-edit.component';

import { PersonRelationsDialogComponent } from './dialogs/person-relations.dialog';
import { AvatarEditDialogComponent } from './dialogs/avatar-edit.dialog';

import { PersonRoutingModule } from './person-routing.module';

import { ImageCropperModule } from 'ng2-img-cropper';

import { TitleService } from 'mh-core';
import { ShoutService } from '../common/shout.service';

const NG_MODULES: Type<any>[] = [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
];

const MH_MODULES: Type<any>[] = [
    MHCommonModule,
    PersonRoutingModule,
    InteractionModule,
    AuditModule,
    AppMaterialModule
];

const MH_COMPONENTS: Type<any>[] = [
    PersonComponent,
    PersonListComponent,
    PersonViewComponent,
    PersonEditComponent,
    PersonRelationsDialogComponent,
    AvatarEditDialogComponent
];

@NgModule({
    declarations: [
        KeysPipe,
        MH_COMPONENTS
    ],
    imports: [
        NG_MODULES,
        MH_MODULES,
        ImageCropperModule
    ],
    providers: [
        TitleService,
        ShoutService,
        DatePipe,
        KeysPipe
    ],
    entryComponents: [
        PersonRelationsDialogComponent,
        AvatarEditDialogComponent
    ]
})
export class PersonModule {
    constructor(titleService: TitleService) {
        titleService.changeModule('Person');
    }
}
