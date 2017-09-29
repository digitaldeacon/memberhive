import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class TitleService {
    public module = '';
    public title = '';
    public subTitle = '';
    constructor(private browserTitle: Title) {
    }

    public getModule(): string {
        return this.module;
    }

    public getTitle(): string {
        return this.title;
    }

    public getSubTitle(): string {
        return this.subTitle;
    }

    public changeModule(module: string): void {
        this.module = module;
        this.title = '';
        this.subTitle = '';
    }

    public setTitle(title: string, subTitle = ''): void {
        this.browserTitle.setTitle('Memberhive [' + this.module + '] ' + this.title);
        this.title = title;
        this.subTitle = subTitle;
    }
}
