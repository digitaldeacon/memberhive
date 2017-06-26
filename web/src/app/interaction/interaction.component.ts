import { Component } from '@angular/core';
import { TitleService } from 'mh-core';

@Component({
    moduleId: 'mh-interaction',
    selector: 'mh-interaction',
    templateUrl: './interaction.component.html'
})
export class InteractionComponent {
    constructor(titleService: TitleService) {
        titleService.changeModule('Person');
    }
}
