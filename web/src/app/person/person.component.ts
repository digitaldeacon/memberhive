import { Component } from '@angular/core';
import { TitleService } from 'mh-core';

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
