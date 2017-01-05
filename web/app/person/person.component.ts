import {Component, OnInit} from '@angular/core';
import {TitleService} from "app/common/title.service";

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person',
    templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit {
    constructor(titleService: TitleService) {
        titleService.changeModule("Person");
    }

    ngOnInit() {
    }
}