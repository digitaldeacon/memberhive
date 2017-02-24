import { Component, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MdInputDirective } from '@angular/material';
import { SearchService } from "./search.service";
import { Router } from "@angular/router";

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: 'mh-search',
    selector: 'mh-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss' ]
})
export class SearchBoxComponent implements OnInit {

    private _searchVisible: boolean = false;
    private backIcon: string = 'arrow_back';
    private searchTermStream: Subject<string> = new Subject<string>();
    @ViewChild(MdInputDirective) private _searchInput: MdInputDirective;

    itemCtrl: FormControl;
    currentItem: string = '';

    public items: Observable<string[]>;

    constructor(private searchService: SearchService,
                private router: Router) {
        this.itemCtrl = new FormControl();
    }

    get searchVisible(): boolean { return this._searchVisible; }

    search(term: string): void { this.searchTermStream.next(term); }

    ngOnInit(): void {
        this.items = this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((term: string) => this.searchService.search(term));
    }

    searchClicked(): void {
        if (!this._searchVisible) {
            this.itemCtrl.reset();
        }
        this.toggleVisibility();
    }

    toggleVisibility(): void {
        this._searchVisible = !this._searchVisible;
    }

    resultClicked(item: any): void {
        this.itemCtrl.reset();
        this.router.navigate(item.url);
    }
}
