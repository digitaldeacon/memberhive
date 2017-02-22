import { Component, OnInit } from '@angular/core';
import { TitleService } from '../common/title.service';
import { AuthService } from '../common/auth/auth.service';
import { Person } from '../person/person';

@Component({
    moduleId: 'mh-dashboard',
    selector: 'mh-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    user: Person;

    constructor(titleService: TitleService,
                private auth: AuthService) {
        let currentDate: Date = new Date();
        titleService.setTitle(currentDate.toDateString());
    }

    ngOnInit(): void {
        this.user = this.auth.getPerson();
    }
}
