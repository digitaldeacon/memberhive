import {NgModule} from '@angular/core';



import {UserComponent} from './user.component';
import {UserRoutingModule}   from './user-routing.module';


@NgModule({
    declarations: [
        UserComponent,

    ], // directives, components, and pipes owned by this NgModule
    imports: [
        UserRoutingModule
    ],
})
export class UserModule {
}

