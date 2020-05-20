import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MomentModule } from 'ngx-moment';

import { AuditLogComponent } from './audit-log.component';
import { AuditService } from './audit.service';

@NgModule({
  declarations: [AuditLogComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    FlexLayoutModule,
    MomentModule
  ],
  providers: [AuditService],
  exports: [AuditLogComponent]
})
export class AuditModule {
  constructor() {}
}
