import { Component, OnInit } from '@angular/core';
import {TitleService} from "app/common/title.service";
import {ActivatedRoute, Params} from "@angular/router";
import {PersonService} from "../person.service";

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person-view',
    templateUrl: './person-view.component.html'
})
export class PersonViewComponent implements OnInit {
    private person: any = {};
    constructor(titleService: TitleService,  private route: ActivatedRoute, private personService: PersonService) {
        titleService.setTitle('Person View');
    }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.personService.getPerson(+params['id']))
            .subscribe((person: any) => this.person = person);
    }
}
