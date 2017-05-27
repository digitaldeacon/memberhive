import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    TitleService,
    Person,
    SettingsPayload,
    UpdateSettingAction } from 'mh-core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as app from '../app.store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'mh-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
    private alive: boolean = true;
    personAttrSet: Array<string> = [
        // 'fullName',
        'firstName',
        'middleName',
        'lastName',
        // 'avatar',
        'email',
        'birthday',
        'gender',
        'age',
        'phoneHome',
        'phoneWork',
        'phoneMobile'
    ];
    personAttr: Array<string>;
    personAttrSelected: Array<string>;

    constructor(titleService: TitleService,
                dragulaService: DragulaService,
                private _store: Store<app.AppState>,
                private _ref: ChangeDetectorRef) {
      titleService.setTitle('All Settings');
      dragulaService.dropModel.subscribe((value: any[]) => {
          this._store.dispatch(new UpdateSettingAction(this.payload(value[0])));
          // this._ref.detectChanges();
      });
      dragulaService.removeModel.subscribe((value: any[]) => {
          // this._store.dispatch(new UpdateSettingAction(this.payload(value[0])));
          // this._ref.detectChanges();
      });
      this._store.select(app.getPeopleSettings)
          .take(1)
          .subscribe((data: any) => {
            this.personAttrSelected = data.list.map((el: string) => el);
            this.filter();
          });
    }

    ngOnInit(): void {
        this.filter();
    }

    ngOnDestroy(): void {
        this.alive = false;
    }

    filter(): void {
        this.personAttr = this.personAttrSet.filter((item: string) => {
            return this.personAttrSelected.indexOf(item) !== 0;
        });
    }

    private payload(key: string): SettingsPayload {
        let data: any;

        if (key === 'PEOPLE_LIST') {
            data = this.personAttrSelected
                .map((el: string) => el); // turning this into a mutable array
        }

        return {
            key: key,
            data: data
        };
    }
}
