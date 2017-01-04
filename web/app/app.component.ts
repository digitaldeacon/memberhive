import {Component, ViewContainerRef} from '@angular/core';

import {} from '@covalent/core';
import {TitleService} from "./common/title.service";

@Component({
    selector: 'mh-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    routes: Object[] = [
        {
            title: "Home", route: "/dashboard", icon: "home"
        }, {
            title: "Persons", route: "/person", icon: "people"
        }, {
            title: "Events", route: "/event", icon: "today"
        }, {
            title: "Groups", route: "/group", icon: "people_outline"
        }
    ];

    titleService: TitleService;

    constructor(titleService: TitleService) {
        this.titleService = titleService;
    }
}
