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

    currentUser: Person;
    persons: Array<Person>;

    constructor(titleService: TitleService,
                private auth: AuthService,
                private personService: PersonService) {
        let currentDate: Date = new Date();
        titleService.setTitle(currentDate.toDateString());
        this.currentUser = this.auth.getCurrentUser();
    }

    ngOnInit(): void {
        this.personService.getPersons()
            .subscribe((persons: Array<Person>) => this.persons = persons);
    }
}
