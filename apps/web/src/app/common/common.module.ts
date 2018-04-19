import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatDatepickerModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatMenuModule,
  MatSelectModule,
  MatExpansionModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatSnackBarModule,
  MatListModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatFormFieldModule,
  MatCheckboxModule
} from '@angular/material';

import { GLOBALS } from '../../config/globals.config';

import { ShoutService } from './shout.service';
import { DialogService } from './dialog.service';
import { AuthGuard } from './auth-guard.service';

import { NotifyboxComponent } from './components/notifybox/notifybox.component';
import { FilterComponent } from './components/filter/filter.component';
import { ConfirmDialogComponent } from './components/confirm/confirm-dialog.component';
import { LoginDialogComponent } from '../login/components/login-dialog/login-dialog.component';

import { AgmCoreModule } from '@agm/core';
import { TagsComponent } from './components/tags/tags.component';

const MATERIAL_MODULES: any[] = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatMenuModule,
  MatListModule,
  MatExpansionModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatSelectModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatProgressSpinnerModule
];

const CUSTOM_COMPONENTS: any[] = [
  NotifyboxComponent,
  FilterComponent,
  ConfirmDialogComponent,
  LoginDialogComponent,
  TagsComponent
];

@NgModule({
  declarations: [CUSTOM_COMPONENTS],
  imports: [
    MATERIAL_MODULES,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: GLOBALS.googleAPIKey
    })
  ],
  providers: [Title, AuthGuard, ShoutService, DialogService],
  exports: [
    CUSTOM_COMPONENTS,
    MATERIAL_MODULES,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule
  ],
  entryComponents: [ConfirmDialogComponent, LoginDialogComponent]
})
export class MhCommonModule {}
