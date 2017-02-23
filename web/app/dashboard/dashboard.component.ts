import { Component, OnInit } from '@angular/core';
import { TitleService } from '../common/title.service';
import { AuthService } from '../common/auth/auth.service';
import { Person } from '../person/person';
import { PersonService } from "../person/person.service";

@Component({
    moduleId: 'mh-dashboard',
    selector: 'mh-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    user: Person;
    persons: Array<Person>;

    constructor(titleService: TitleService,
                private auth: AuthService,
                private personService: PersonService) {
        let currentDate: Date = new Date();
        titleService.setTitle(currentDate.toDateString());
        this.user = this.auth.getPerson();
    }

    ngOnInit(): void {
        this.personService.getPersons()
            .subscribe((persons: Array<Person>) => this.persons = persons);
    }
}
