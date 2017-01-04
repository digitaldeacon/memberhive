import { Component, OnInit } from '@angular/core';
import {TitleService} from "app/common/title.service";
@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-view',
    templateUrl: './person-view.component.html'
})
export class PersonViewComponent implements OnInit {
    constructor(titleService: TitleService) {
        titleService.setTitle('Person View');
    }

    ngOnInit() { }
}