import { NgModule } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';

import { CovalentCoreModule, TD_LOADING_ENTRY_COMPONENTS } from '@covalent/core';
import { CovalentChipsModule } from '@covalent/chips';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentJsonFormatterModule } from '@covalent/json-formatter';
import { CovalentChartsModule } from '@covalent/charts';
import { CovalentDataTableModule } from '@covalent/data-table';
import { CovalentPagingModule } from '@covalent/paging';
import { CovalentSearchModule } from '@covalent/search';

import { PersonComponent } from './person.component';
import { PersonListComponent } from './list/person-list.component';

import { PersonRoutingModule } from './person-routing.module';

@NgModule({
  declarations: [
    PersonComponent,
    PersonListComponent
  ],
  imports: [
    PersonRoutingModule,
  ],
  providers: [
    Title,
  ],
})
export class PersonModule {}
