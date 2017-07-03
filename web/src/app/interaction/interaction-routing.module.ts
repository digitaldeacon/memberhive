import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InteractionComponent } from './interaction.component';
import { InteractionListComponent } from './list/interaction-list.component';
import { InteractionCreateComponent } from './create/interaction-create.component';

const routes: Routes = [
    {
        path: '',
        component: InteractionComponent,
        children: [
            {path: '', component: InteractionListComponent},
            {path: 'list', component: InteractionListComponent},
            {path: 'create', component: InteractionCreateComponent},
            {path: 'edit/:id', component: InteractionCreateComponent}
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InteractionRoutingModule {
}
