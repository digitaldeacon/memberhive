import {NgModule} from '@angular/core';



import {UserComponent} from './user.component';
import {UserRoutingModule}   from './user-routing.module';
import {LoginService} from "./auth/login.service";


@NgModule({
    declarations: [
        UserComponent,

    ], // directives, components, and pipes owned by this NgModule
    imports: [
        UserRoutingModule
    ],
    providers: [
        LoginService
    ],
    exports: [
        LoginService
    ]
})
export class UserModule {
}

