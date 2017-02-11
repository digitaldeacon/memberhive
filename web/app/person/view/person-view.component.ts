import {Component, OnInit, Input} from '@angular/core';
import {TitleService} from "../../common/title.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {PersonService} from "../person.service";
import {Person} from "../person";
import {Observable} from "rxjs";

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-view',
    templateUrl: './person-view.component.html',
    styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {
    private persons: Array<Person>;
    @Input() person: Person;

    constructor(private titleService: TitleService,
                private router: Router,
                private route: ActivatedRoute,
                private personService: PersonService) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.personService.getPerson(params['id']))
            .subscribe((person: Person) => {
                this.person = person;
                this.titleService.setTitle('Person: ' + person.fullName);
        });
    }

    prevPerson(): void {
        this.personService.getPersons() // TODO: get them from the cache
            .subscribe(
                (persons: Array<Person>) => {
                    this.persons = persons;
                    let idx: number = this.persons.findIndex((p: Person) => p.uid === this.person.uid);
                    idx--;
                    if (this.persons[idx]) {
                        this.router.navigate(['/person/view', this.persons[idx].uid]);
                    }
                });
    }
    nextPerson(): void {
        this.personService.getPersons() // TODO: get them from the cache
            .subscribe(
                (persons: Array<Person>) => {
                    this.persons = persons;
                    let idx: number = this.persons.findIndex((p: Person) => p.uid === this.person.uid);
                    idx++;
                    if (this.persons[idx]) {
                        this.router.navigate(['/person/view', this.persons[idx].uid]);
                    }
                });
    }
}
