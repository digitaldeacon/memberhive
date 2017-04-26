import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './viewport/view.component';
import { AuthGuard } from 'mh-core';

export const routes: Routes = [
    {
        path: '',
        component: ViewComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'},
            {
                path: 'person',
                loadChildren: './person/person.module#PersonModule'
            },
            {
                path: 'interaction',
                loadChildren: './interaction/interaction.module#InteractionModule'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'settings',
                loadChildren: './settings/settings.module#SettingsModule'
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
