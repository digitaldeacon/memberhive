import {Component, animate, transition, style, state, trigger, ElementRef} from '@angular/core';
import {TitleService} from './common/title.service';

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
                width: '60px',
                flex: '1 1 60px;',
                'min-width': '60px',
                'max-width': '60px'
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

    titleService: TitleService;

    alwaysVisible: boolean = false;
    drawerVisible: boolean = false;
    sidenavStatus: string = 'open';

    constructor(titleService: TitleService, private _element: ElementRef) {
        this.titleService = titleService;
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
}
