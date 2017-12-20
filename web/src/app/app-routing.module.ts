import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './viewport/view.component';
import { AuthGuard } from './common/auth-guard.service';

export const routes: Routes = [
    {
        path: '',
        component: ViewComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                canActivate: [AuthGuard],
                pathMatch: 'full'
            },
            {
                path: 'person',
                canActivate: [AuthGuard],
                loadChildren: './person/person.module#PersonModule'
            },
            {
                path: 'interaction',
                canActivate: [AuthGuard],
                loadChildren: './interaction/interaction.module#InteractionModule'
            },
            {
                path: 'dashboard',
                canActivate: [AuthGuard],
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'settings',
                canActivate: [AuthGuard],
                loadChildren: './settings/settings.module#SettingsModule'
            }
            // { path: '**', loadChildren: './dashboard/dashboard.module#DashboardModule' },
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
