/* config.service.ts */

import {Injectable} from '@angular/core';
import {Title}  from '@angular/platform-browser';
@Injectable()
export class TitleService {
    public module: string = "";
    public title: string = "";
    public subTitle: string = "";
    constructor(private browserTitle: Title) {

    }
    public getModule() {
        return this.module;
    }

    public getTitle() {
        return this.title;
    }

    public getSubTitle() {
        return this.subTitle;
    }

    public changeModule(module: string) {
        this.module = module;
        this.title = "";
        this.subTitle = "";
    }

    public setTitle(title: string, subTitle: string = "") {
        this.browserTitle.setTitle('Memberhive [' + this.module + '] ' + this.title);
        this.title = title;
        this.subTitle = subTitle;
    }
}