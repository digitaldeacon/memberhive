import {Component, OnInit} from '@angular/core';
import {TitleService} from "app/common/title.service";

@Component({
    moduleId: 'mh-dashboard',
    selector: 'mh-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    constructor(titleService: TitleService) {
        titleService.changeModule("Dashboard");
        titleService.setTitle('Main Dashboard');
    }

    ngOnInit() {
    }
}