import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import { ShoutService } from '../common/shout.service';
import * as core from 'mh-core';
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
    // TODO: possibly remove this as we have a default in the reducer state
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

    maritalStatus: FormArray;

    sysSettings: core.SystemSettings;
    personSettings: core.PersonSettings;
    settingsForm: FormGroup;

    constructor(titleService: core.TitleService,
                private _dragulaService: DragulaService,
                private _store: Store<app.AppState>,
                private _shout: ShoutService,
                private _fb: FormBuilder) {

        titleService.changeModule('Settings');
        titleService.setTitle('All Settings');

        this._initStore();
        this._initDragula();
        this._setContextMenu();
    }

    ngAfterViewInit(): void {
        this.filter();
    }

    ngOnDestroy(): void {
        this._alive = false;
        this._dragulaService.destroy('PEOPLE_MARITAL');
        this._dragulaService.destroy('PEOPLE_LIST');
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
        this.settingsForm.get('system').patchValue(this.sysSettings);
        this.settingsForm.get('people').patchValue(this.personSettings);
        this.settingsForm.valueChanges
            .debounceTime(600)
            .distinctUntilChanged()
            .subscribe((data: core.SettingsState) => {
                // data.people.list = this.personAttrSelected;
                this._store.dispatch(new core.UpdateSettingAction(data));
            });
    }

    buildFormArray(): FormArray {
        let fga: Array<FormGroup> = [];
        for (let status of this.personSettings.maritalStatus) {
            fga.push(this.buildFormGroup(status.status));
        }
        this.maritalStatus = this._fb.array(fga);
        // this.maritalStatusW = new FormArrayWrapper(this.maritalStatus);
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
        if (this.maritalStatus.length > 3) {
            this.maritalStatus.removeAt(index);
        } else {
            this._shout.error('We need to have a min. of 3 status');
        }
    }

    filter(): void {
        this.personAttr = this.personAttrSet.filter((item: string) => {
            return this.personAttrSelected ? this.personAttrSelected.indexOf(item) < 0 : false;
        });
    }

    private _initStore(): void {
        this._store.select(app.getMessage)
            .takeWhile(() => this._alive)
            .subscribe((message: core.Message) => {
                if (message) {
                    this._shout.out(message.text, message.type);
                    this._store.dispatch(new core.ClearSettingsMessageAction());
                }
            });
        this._store.select(app.getSettingsState)
            .take(1)
            .subscribe((data: any) => {
                this.personAttrSelected = data.people.list ? data.people.list : [];
                this.sysSettings = data.system;
                this.personSettings = data.people;
                this.filter();
                this.createForm();
            });
    }
    private _initDragula(): void {
        this._dragulaService.setOptions('PEOPLE_MARITAL', {
            moves: function (el: any, container: any, handle: any): boolean {
                return handle.className.indexOf('handle') > -1;
            }
        });
        this._dragulaService.dropModel.subscribe(() => {
            const payload: core.SettingsState = {
                people: this.personSettings
            };
            this._store.dispatch(new core.UpdateSettingAction(payload));
        });
    }

    private _setContextMenu(): void {
        let buttons: core.ContextButton[] = [];
        // buttons.push({icon: 'person_add', link: '/person/create'});

        this._store.dispatch(new core.SetContextButtonsAction(buttons));
    }
}
