import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InteractionComponent } from './interaction.component';
import { InteractionListComponent } from './list/interaction-list.component';
import { InteractionFormComponent } from './form/interaction-form.component';

const routes: Routes = [
    {
        path: '',
        component: InteractionComponent,
        children: [
            {path: '', component: InteractionListComponent},
            {path: 'list', component: InteractionListComponent},
            {path: 'create', component: InteractionFormComponent},
            {path: 'edit/:id', component: InteractionFormComponent}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InteractionRoutingModule {
}
