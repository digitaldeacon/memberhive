import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../common/title.service';
import { PersonService } from "../person.service";
import { Person } from "../person";

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-list',
    templateUrl: './person-list.component.html',
    styleUrls: ['./person-list.component.scss']
})

export class PersonListComponent implements OnInit {
    people: Array<Person>;

    constructor(private personService: PersonService,
                titleService: TitleService) {
        titleService.setTitle('Person List');
    }

    ngOnInit(): void {
        this.personService.getPersons()
            .subscribe((people: Array<Person>) => this.people = people);
    }
}
