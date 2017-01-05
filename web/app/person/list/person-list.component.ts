import { Component, OnInit } from '@angular/core';
import {TitleService} from "app/common/title.service";
import {HttpService} from "../../common/http.service";
@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-list',
    templateUrl: './person-list.component.html'
})
export class PersonListComponent implements OnInit {
    private test:string;
    constructor(titleService: TitleService, private http:HttpService) {
        titleService.setTitle('Person List');
    }

    ngOnInit() {
        this.http.get('person/test')
            .subscribe(
                (response) => this.test = response.response
            )
    }
}