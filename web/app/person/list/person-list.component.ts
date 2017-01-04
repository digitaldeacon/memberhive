import { Component, OnInit } from '@angular/core';
import {TitleService} from "app/common/title.service";
@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-list',
    templateUrl: './person-list.component.html'
})
export class PersonListComponent implements OnInit {
    constructor(titleService: TitleService) {
        titleService.setTitle('Person List');
    }
    ngOnInit() { }
}