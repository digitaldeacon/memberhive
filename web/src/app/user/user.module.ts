import {NgModule} from '@angular/core';
import {MaterialModule} from '@angular/material';

import {UserComponent} from './user.component';
import {UserRoutingModule}   from './user-routing.module';

@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        MaterialModule.forRoot(),
        UserRoutingModule
    ]
})

export class UserModule {
}
