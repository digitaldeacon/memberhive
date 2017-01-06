import {Component, OnInit} from '@angular/core';
import {TitleService} from "app/common/title.service";
import {HttpService} from "../../common/http.service";
@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-list',
    templateUrl: './person-list.component.html'
})
export class PersonListComponent implements OnInit {
    private persons: any;

    constructor(titleService: TitleService, private http: HttpService) {
        titleService.setTitle('Person List');
    }

    ngOnInit() {
        this.http.get('person/list')
            .subscribe(
                (response) => this.persons = response.response
            )
    }
}