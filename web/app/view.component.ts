import {Component} from '@angular/core';

import {} from '@covalent/core';
import {TitleService} from "./common/title.service";

@Component({
    selector: 'mh-view',
    templateUrl: './view.component.html',
})
export class ViewComponent {
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

