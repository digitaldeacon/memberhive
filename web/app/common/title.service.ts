/* config.service.ts */

import {Injectable} from '@angular/core';

@Injectable()
export class TitleService {
    public module: string = "";
    public title: string = "";
    public subTitle: string = "";

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
        this.title = title;
        this.subTitle = subTitle;
    }
}