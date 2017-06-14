import { Component, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {
    TitleService,
    SysSettings,
    PersonSettings,
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
    private _alive: boolean = true;
    hideToggle: boolean = false;
    personAttrSet: Array<string> = [
        'firstName',
        'middleName',
        'lastName',
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

    personMaritalStatusSet: Array<string> = [
        'single',
        'engaged',
        'married',
        'widowed',
        'separated',
        'divorced'
    ];
    maritalStatus: FormArray = undefined;
    maritalStatusSelected: Array<string>;

    sysSettings: SysSettings;
    personSettings: PersonSettings;
    settingsForm: FormGroup;

    constructor(titleService: TitleService,
                dragulaService: DragulaService,
                private _store: Store<app.AppState>,
                private _fb: FormBuilder) {

        titleService.setTitle('All Settings');
        dragulaService.dropModel.subscribe(() => {
          const payload: any = {
              people: {
                  list: this.personAttrSelected
              }
          };
          this._store.dispatch(new UpdateSettingAction(payload));
        });

        this._store.select(app.getSettingsState)
            .take(1)
            .subscribe((data: any) => {
                console.log('settings', data);
                this.personAttrSelected = data.people.list ? data.people.list : [];
                this.filter();
                this.sysSettings = data.system;
                this.personSettings = data.people;
                this.createForm();
        });
    }

    ngAfterViewInit(): void {
        this.filter();
    }

    ngOnDestroy(): void {
        this._alive = false;
    }

    createForm(): void {
        this.settingsForm = this._fb.group({
            system: this._fb.group({
                churchName: ''
            }),
            people: this._fb.group({
                maritalStatus: this.buildFormArray()
            })
        });
        this.settingsForm.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe((data: any) => {
                data.people.list = this.personAttrSelected;
                this._store.dispatch(new UpdateSettingAction(data));
        });
        this.settingsForm.get('system').patchValue(this.sysSettings);
        // this.settingsForm.get('person').patchValue(this.personSettings);
    }

    buildFormArray(): FormArray {
        let fga: Array<FormGroup> = [];
        if (!this.personSettings
            || !this.personSettings.maritalStatus
            || this.personSettings.maritalStatus.length < 3) {
            for (let status of this.personMaritalStatusSet) {
                fga.push(this.buildFormGroup(status));
            }
        } else {
            for (let status of this.personSettings.maritalStatus) {
                fga.push(this.buildFormGroup(status.status));
            }
        }
        this.maritalStatus = this._fb.array(fga);
        return this.maritalStatus;
    }

    buildFormGroup(status?: string): FormGroup {
        return this._fb.group({
            status: status
        });
    }

    addMaritalStatus(el: HTMLInputElement): void {
        if (el.value !== '') {
            this.maritalStatus.push(this.buildFormGroup(el.value));
        }
        el.value = '';
    }
    removeMaritalStatus(index: number): void {
        this.maritalStatus.removeAt(index);
    }

    filter(): void {
        this.personAttr = this.personAttrSet.filter((item: string) => {
            return this.personAttrSelected ? this.personAttrSelected.indexOf(item) < 0 : false;
        });
    }
}
