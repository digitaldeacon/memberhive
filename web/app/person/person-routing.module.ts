import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PersonComponent} from './person.component';
import {PersonListComponent} from './list/person-list.component';
import {PersonViewComponent} from './view/person-view.component';

const routes: Routes = [
    {
        path: '',
        component: PersonComponent,
        children: [
            {path: '', component: PersonListComponent},
            {path: 'list', component: PersonListComponent},
            {path: 'view', component: PersonViewComponent},
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonRoutingModule {
}
