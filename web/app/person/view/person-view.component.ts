import {Component, OnInit, Input} from '@angular/core';
import {TitleService} from "../../common/title.service";
import {ActivatedRoute, Params} from "@angular/router";
import {PersonService} from "../person.service";
import {Person} from "../person";

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-view',
    templateUrl: './person-view.component.html',
    styleUrls: ['./person-view.component.scss']
})
export class PersonViewComponent implements OnInit {
    @Input() person: Person;

    constructor(private titleService: TitleService,
                private route: ActivatedRoute,
                private personService: PersonService) {
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.personService.getPerson(+params['id']))
            .subscribe((person: Person) => {
                this.person = person;
                this.titleService.setTitle('Person: ' + person.fullName);
        });
    }
}
