import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { TitleService, Person } from 'mh-core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as app from '../app.store';

@Component({
  selector: 'mh-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    personAttrSet: Array<string> = [
        'fullName',
        'firstName',
        'middleName',
        'lastName',
        'avatar',
        'email',
        'birthday',
        'gender',
        'age',
        'phoneHome',
        'phoneWork',
        'phoneMobile'
    ];
    personAttr: Array<string>;
    personAttrSelected: Array<string> = [
        'email'
    ];

    peopleSettings$: Observable<any>;

    constructor(private _store: Store<app.AppState>,
                titleService: TitleService,
                dragulaService: DragulaService) {
      titleService.setTitle('All Settings');
      dragulaService.dropModel.subscribe((value: any[]) => {
          this.onDropModel(value.slice(1));
      });
      dragulaService.removeModel.subscribe((value: any[]) => {
          this.onRemoveModel(value.slice(1));
      });
      this.peopleSettings$ = this._store.select(app.getPeopleSettings);
    }

    ngOnInit(): void {
        this.personAttr = this.personAttrSet.filter((item: string) => {
            return this.personAttrSelected.indexOf(item) !== 0;
        });
    }

    private onDropModel(args: any): void {
        let [el, target, source] = args;
        console.log('onDropModel:');
        console.log(el);
        console.log(target);
        console.log(source);
        // do something else
        // console.log(el, target, source, this.personAttrSelected);
    }

    private onRemoveModel(args: any): void {
        let [el, source] = args;
        console.log('onDropModel:');
        console.log(el);
        console.log(source);
        // do something else
        // console.log(el, source, this.personAttrSelected);
    }
}
