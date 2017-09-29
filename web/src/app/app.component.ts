import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
    selector: 'mh-app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(private _iconRegistry: MatIconRegistry,
                private _domSanitizer: DomSanitizer) {
        // Register svgs
        this._iconRegistry.addSvgIconInNamespace('assets', 'memberhive',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/memberhive.svg'));
    }

}
