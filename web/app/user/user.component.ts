import {Component, OnInit} from '@angular/core';
import {TitleService} from "app/common/title.service";

@Component({
    moduleId: 'mh-user',
    selector: 'mh-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
    constructor(titleService: TitleService) {
        titleService.changeModule("User");
        titleService.setTitle('Main Dashboard');
    }

    ngOnInit() {
    }
}