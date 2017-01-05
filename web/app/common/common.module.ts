import {NgModule} from '@angular/core';

import {LoginService} from "./auth/login.service";
import {TitleService} from "./title.service";


@NgModule({
    declarations: [
    ], // directives, components, and pipes owned by this NgModule
    imports: [

    ],
    providers: [
        LoginService,
        TitleService
    ],
    exports: [

    ]
})
export class CommonModule {
}

