import {Component} from '@angular/core';

import {TitleService} from "./common/title.service";

@Component({
    selector: 'mh-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
})
export class ViewComponent {
    routes: Object[] = [
        {
            title: "Home", route: "/dashboard", icon: "home"
        }, {
            title: "Persons", route: "/person", icon: "people"
        }, {
            title: "Events", route: "", icon: "today"
        }, {
            title: "Groups", route: "", icon: "people_outline"
        }
    ];

    titleService: TitleService;

    constructor(titleService: TitleService) {
        this.titleService = titleService;
    }
}

