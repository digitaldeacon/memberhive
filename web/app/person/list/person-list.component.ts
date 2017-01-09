import {Component, OnInit} from '@angular/core';
import {TitleService} from "app/common/title.service";
import {PersonService} from "../person.service";
@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-list',
    templateUrl: './person-list.component.html'
})
export class PersonListComponent implements OnInit {
    private persons: any;

    constructor(titleService: TitleService, private personService : PersonService) {
        titleService.setTitle('Person List');
    }

    ngOnInit() {
        this.personService.getPersons()
            .subscribe(
                (persons) => this.persons = persons
            )
    }
}