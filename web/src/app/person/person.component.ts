import { Component } from '@angular/core';
import { TitleService } from '../common/title.service';

@Component({
    moduleId: 'mh-person',
    selector: 'mh-person',
    templateUrl: './person.component.html'
})
export class PersonComponent {
    constructor(titleService: TitleService) {
        titleService.changeModule('Person');
    }
}
