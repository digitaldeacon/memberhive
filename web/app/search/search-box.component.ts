import {Component, ViewChild, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {MdInputDirective} from '@angular/material';
import {SearchService} from "./search.service";
import {Router} from "@angular/router";

import 'rxjs/add/operator/startWith';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';

@Component({
    moduleId: 'mh-search',
    selector: 'mh-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss' ]
})
export class SearchBoxComponent implements OnInit {

    private _searchVisible: boolean = false;
    private backIcon: string = 'arrow_back';
    private searchTermStream = new Subject<string>();
    itemCtrl: FormControl;
    currentItem = '';

    @ViewChild(MdInputDirective) private _searchInput: MdInputDirective;

    public items: Observable<string[]>;
    public item: any;

    constructor(private searchService: SearchService, private router: Router) {
        this.itemCtrl = new FormControl();
    }

    get searchVisible(): boolean { return this._searchVisible; }

    search(term: string) { this.searchTermStream.next(term); }

    ngOnInit() {
        this.items = this.searchTermStream
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap((term: string) => this.searchService.search(term));
    }

    searchClicked(): void {
        if (!this._searchVisible) {
            //this._searchInput.focus();
        }
        this.toggleVisibility();
        console.log(this._searchVisible);
    }

    toggleVisibility(): void {
        this._searchVisible = !this._searchVisible;
    }

    resultClicked(item: any): void {
        // console.log(item.url);
        this.router.navigate([item.url]);
    }
}
