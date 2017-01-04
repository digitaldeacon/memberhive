import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {ViewComponent} from './view.component';

export const routes: Routes = [
    {
        path: '',
        component: ViewComponent,
        children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'person', loadChildren: './person/person.module#PersonModule'},
            {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'}
        ]
    },
    {path: 'login', component: LoginComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
