import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ViewButtonsService {
    private _buttons: BehaviorSubject<ViewButton[]>;
    private _dataStore: {
        buttons: ViewButton[];
    };

    constructor() {
        this._buttons = <BehaviorSubject<ViewButton[]>> new BehaviorSubject([]);
        this._dataStore = { buttons: [] };
    }

    addButtons(buttons: ViewButton[]): void {
        for (const button of buttons) {
            this._dataStore.buttons.push(button);
        }
        this._buttons.next(Object.assign({}, this._dataStore).buttons);
    }

    load(): void {
        this._dataStore.buttons.push({icon: 'person_add', link: '/person/create'});
        this._buttons.next(Object.assign({}, this._dataStore).buttons);
    }

    get buttons(): Observable<ViewButton[]> {
        this._buttons.next(Object.assign({}, this._dataStore).buttons);
        return this._buttons.asObservable();
    }
}

export interface ViewButton {
    icon: string;
    link: string;
}
