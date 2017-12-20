import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from './search.service';
import { Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';

interface SearchItem {
    id: number;
    uid: string;
    icon: string;
    type: string;
    url: string[];
}

@Component({
    moduleId: 'mh-search',
    selector: 'mh-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss' ]
})
export class SearchBoxComponent implements OnInit {

    private _searchVisible: boolean = false;
    private _searchTermStream$: Subject<string> = new Subject<string>();

    itemCtrl: FormControl;
    items: Observable<string[]>;
    searchInFocus: boolean = false;
    searching: boolean = false;

    constructor(private _searchService: SearchService,
                private _router: Router) {
        this.itemCtrl = new FormControl();
    }

    get searchVisible(): boolean { return this._searchVisible; }

    search(term: string): void {
        this._searchTermStream$.next(term);
    }

    ngOnInit(): void {
        this.items = this._searchTermStream$
            .debounceTime(300)
            .distinctUntilChanged()
            .do(() => this.searching = true)
            .switchMap((term: string) => this._searchService.search(term))
            .do(() => this.searching = false);
    }

    searchClicked(): void {
        if (!this._searchVisible) {
            this.itemCtrl.reset();
        }
        this.toggleVisibility();
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        const searchObj: SearchItem = event.option.value;
        if (searchObj.url.length === 2) {
            this.itemCtrl.reset();
            this._router.navigate([searchObj.url[0] + '/' + searchObj.url[1]]);
        }
    }

    toggleVisibility(): void {
        this._searchVisible = !this._searchVisible;
    }

    resultClicked(item: any): void {
        this.itemCtrl.reset();
        this._router.navigate(item.url);
    }
}
