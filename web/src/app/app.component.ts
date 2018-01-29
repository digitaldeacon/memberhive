import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { DOCUMENT } from '@angular/common';


@Component({
    selector: 'mh-app',
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    constructor(@Inject(DOCUMENT) doc: Document,
                @Inject(LOCALE_ID) locale: string,
                renderer: Renderer2,
                private _iconRegistry: MatIconRegistry,
                private _domSanitizer: DomSanitizer) {
        // Register svgs
        this._iconRegistry.addSvgIconInNamespace('assets', 'memberhive',
            this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/memberhive.svg'));

        console.log(`Using locale: ${locale}`);
        // set the "lang" attribute on the "<html>" element
        renderer.setAttribute(doc.documentElement, 'lang', locale);
    }

}
