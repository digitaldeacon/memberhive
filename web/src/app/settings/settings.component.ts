import { Component, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    TitleService,
    SysSettings,
    UpdateSettingAction } from 'mh-core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import * as app from '../app.store';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'mh-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit, OnDestroy {
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
    sysSettings: SysSettings;
    settingsForm: FormGroup;

    constructor(titleService: TitleService,
                dragulaService: DragulaService,
                private _store: Store<app.AppState>,
                private _fb: FormBuilder,
                private _ref: ChangeDetectorRef) {

        titleService.setTitle('All Settings');
        this.createForm();
        dragulaService.dropModel.subscribe((value: any[]) => {
          const payload: any = {
              people: {
                  list: this.personAttrSelected
              }
          };
          this._store.dispatch(new UpdateSettingAction(payload));
          // this._ref.detectChanges();
        });

        this._store.select(app.getSettingsState)
          .take(1)
          .subscribe((data: any) => {
              this.personAttrSelected = data.people.list.map((el: string) => el);
              this.filter();
              this.sysSettings = data.system;
              this.settingsForm.get('system').patchValue(this.sysSettings);
        });
    }

    ngAfterViewInit(): void {
        this.filter();
    }

    ngOnDestroy(): void {
        this.alive = false;
    }

    createForm(): void {
        this.settingsForm = this._fb.group({
            system: this._fb.group({
                churchName: ''
            })
        });
        this.settingsForm.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe((data: any) => {
                this._store.dispatch(new UpdateSettingAction(data));
        });
    }

    filter(): void {
        this.personAttr = this.personAttrSet.filter((item: string) => {
            return this.personAttrSelected.indexOf(item) < 0;
        });
    }
}
