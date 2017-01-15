import { Component, ViewChild, Input} from '@angular/core';

import { MdInputDirective } from '@angular/material';
import {SearchService} from "./search.service";
import {Router} from "@angular/router";

@Component({
    moduleId: 'mh-search',
    selector: 'mh-search-box',
    templateUrl: './search-box.component.html',
    styleUrls: ['./search-box.component.scss' ]
})
export class SearchBoxComponent {

    private _searchVisible: boolean = false;

    @ViewChild(MdInputDirective) private _searchInput: MdInputDirective;

    public items: Array<any>;
    public item: any;

    private backIcon: string = 'arrow_back';
    private showUnderline: boolean = false;
    private debounce: number = 400;
    private alwaysVisible: boolean = false;

    /**
     * placeholder?: string
     * Placeholder for the underlying input component.
     */
    @Input('placeholder') placeholder: string;


    constructor(private searchService: SearchService, private router: Router) {}

    set value(value: any) {
        this._searchInput.value = value;
    }
    get value(): any {
         return this._searchInput.value;
    }

    get searchVisible(): boolean {
        return this._searchVisible;
    }

    /**
     * Method executed when the search icon is clicked.
     */
    searchClicked(): void {
        if (!this._searchVisible) {
            // this._searchInput.focus();
        }
        this.toggleVisibility();
    }

    toggleVisibility(): void {
        this._searchVisible = !this._searchVisible;
    }

    handleSearchDebounce(value: string): void {
    }

    handleSearch(value: string): void {
        this.searchService.search(this.value)
            .subscribe((results: Array<any>) => this.items = results);
    }

    handleClear(): void {

    }

    handleBlur(): void {
        this.value = '';
    }

    stopPropagation(event: Event): void {
        event.stopPropagation();
    }

    resultClicked(item: any) {
        this.router.navigate([item.url]);
    }
}
