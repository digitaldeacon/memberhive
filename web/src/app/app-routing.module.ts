import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewComponent } from './viewport/view.component';
import { AuthGuard } from './common/auth/auth-guard.service';

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
                path: 'note',
                loadChildren: './note/note.module#NoteModule'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
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
