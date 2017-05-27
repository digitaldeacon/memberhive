import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MdListModule, MdIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

import { TitleService } from 'mh-core';
import { AuditLogComponent } from './audit-log.component';
import { AuditService } from './audit.service';

@NgModule({
    declarations: [
        AuditLogComponent
    ],
    imports: [
        CommonModule,
        MdListModule,
        MdIconModule,
        FlexLayoutModule,
        MomentModule
    ],
    providers: [
        AuditService
    ],
    exports: [
        AuditLogComponent
    ]
})
export class AuditModule {
    constructor(titleService: TitleService) {
        titleService.changeModule('Dashboard');
    }
}
