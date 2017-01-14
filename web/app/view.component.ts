import {Component, animate, transition, style, state, trigger} from '@angular/core';
import {TitleService} from './common/title.service';

@Component({
    selector: 'mh-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    animations: [
        trigger('inputState', [
            state('false', style({
                width: '0%',
                'margin-left': '0px'
            })),
            state('true',  style({
                width: '100%',
                'margin-left': '*'
            })),
            transition('0 => 1', animate('200ms ease-in')),
            transition('1 => 0', animate('200ms ease-out'))
        ])
    ]
})
export class ViewComponent {

    routes: Object[] = [
        {
            title: 'Home', route: '/dashboard', icon: "home"
        }, {
            title: "Persons", route: "/person", icon: "people"
        }, {
            title: "Events", route: "", icon: "today"
        }, {
            title: "Groups", route: "", icon: "people_outline"
        }
    ];

    titleService: TitleService;

    alwaysVisible: boolean = false;

    constructor(titleService: TitleService) {
        this.titleService = titleService;
    }

    toggleAlwaysVisible(): void {
        this.alwaysVisible = !this.alwaysVisible;
    }
}
