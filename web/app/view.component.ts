import { Component, style, state, trigger, ElementRef } from '@angular/core';
import { TitleService } from './common/title.service';
import { AuthService } from './common/auth/auth.service';
import { Person } from './person/person';

@Component({
    selector: 'mh-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
    animations: [
        trigger('drawer', [
            state('false', style({
                width: '200px'
            })),
            state('true',  style({
                width: '75px',
                flex: '1 1 75px;',
                'min-width': '75px',
                'max-width': '75px'
            }))
            /*transition('0 => 1', animate('200ms ease-in')),
            transition('1 => 0', animate('200ms ease-out'))*/
        ])
    ]
})
export class ViewComponent {

    routes: Object[] = [
        {
            title: 'Dashboard', route: '/dashboard', icon: "dashboard"
        }, {
            title: "Persons", route: "/person", icon: "people"
        }, {
            title: "Events", route: "", icon: "today"
        }, {
            title: "Groups", route: "", icon: "people_outline"
        }
    ];

    auth: AuthService;
    user: Person;

    alwaysVisible: boolean = false;
    drawerVisible: boolean = false;
    sidenavStatus: string = 'open';

    constructor(private titleService: TitleService,
                auth: AuthService,
                private _element: ElementRef) {
        this.auth = auth;
        this.user = auth.getPerson();
    }

    toggleAlwaysVisible(): void {
        this.alwaysVisible = !this.alwaysVisible;
    }

    logout(): void {
        // console.log('logging out');
    }

    toggleFullscreen(): void {
        let elem: any = this._element.nativeElement.querySelector('.demo-content');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullScreen) {
            elem.msRequestFullScreen();
        }
    }

    toggleDrawer(): void {
        this.drawerVisible = this.drawerVisible ? false : true;
    }

    isActiveItem(title: any): boolean {
        return this.titleService.getModule() === title;
    }
}
