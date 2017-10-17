import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TitleService {
    private module = new Subject<string>();
    private title = new Subject<string>();
    private subTitle = new Subject<string>();

    /*public module = '';
    public title = '';
    public subTitle = '';*/

    constructor(private _browserTitle: Title) {
    }

    getModule(): Observable<string> {
        return this.module.asObservable();
    }

    getTitle(): Observable<string> {
        return this.title.asObservable();
    }

    getSubTitle(): Observable<string> {
        return this.subTitle.asObservable();
    }

    changeModule(module: string): void {
        this.module.next(module);
        this.title.next('');
        this.subTitle.next('');
    }

    setTitle(title: string): void {
        this.title.next(title);
        this._browserTitle.setTitle(title + ' - Memberhive');
    }

    setSubTitle(subTitle: string): void {
        this.subTitle.next(subTitle);
    }
}
