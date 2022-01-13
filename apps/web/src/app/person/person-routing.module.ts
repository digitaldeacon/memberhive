import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonComponent } from './person.component';
import { PersonListComponent } from './list/person-list.component';
import { PersonViewComponent } from './view/person-view.component';
import { PeopleMapComponent } from './map/people-map.component';
import { PersonCreateComponent } from './create/person-create.component';

const routes: Routes = [
  {
    path: '',
    component: PersonComponent,
    children: [
      { path: '', component: PersonListComponent },
      { path: 'list', component: PersonListComponent },
      { path: 'create', component: PersonCreateComponent },
      { path: 'map', component: PeopleMapComponent },
      { path: 'view/:id', component: PersonViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
