import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule, MatIconModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'angular2-moment';

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
        MatButtonModule,
        MatToolbarModule,
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
    constructor() {
    }
}
