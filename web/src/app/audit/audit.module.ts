import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MatListModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

import { TitleService } from '../common/title.service';
import { AuditLogComponent } from './audit-log.component';
import { AuditService } from './audit.service';

@NgModule({
    declarations: [
        AuditLogComponent
    ],
    imports: [
        CommonModule,
        MatListModule,
        MatIconModule,
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
