import {Component} from '@angular/core';
import {TitleService} from '../common/title.service';

@Component({
    moduleId: 'mh-dashboard',
    selector: 'mh-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent  {
    constructor(titleService: TitleService) {
        titleService.setTitle('Dashboard');
    }
}
