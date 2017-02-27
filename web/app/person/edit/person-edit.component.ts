import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { DatePipe } from '@angular/common';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ENTER } from "@angular/material";
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { TitleService } from "../../common/title.service";
import { ShoutService } from "../../common/shout.service";
import { PersonService } from "../person.service";
import { AuthService } from '../../common/auth/auth.service';
import { Person } from '../person';

import { AvatarEditDialogComponent } from '../dialogs/avatar-edit.dialog';

@Component({
    selector: 'mh-person-edit',
    templateUrl: 'person-edit.component.html',
    styleUrls: ['person-edit.component.scss']
})

export class PersonEditComponent implements OnInit {

    private _data: any = new BehaviorSubject<Person[]>([]);
    private _pwFormControl: FormControl;
    private _pwRandCheckbox: FormControl;

    form: FormGroup;  // our model driven form
    submitted: boolean;  // keep track on whether form is submitted
    events: any[] = [];  // use later to display form changes
    mStatus: any[] = [ // TODO: move this to the system settings in the options table
        {value: 'single', viewValue: 'Single'},
        {value: 'married', viewValue: 'Married'},
        {value: 'widdow', viewValue: 'Widdow'},
        {value: 'divorce-living', viewValue: 'Living in Divorce'},
        {value: 'divorce-active', viewValue: 'Divorced'}
    ];
    randomPassword: boolean = true;
    separatorKeys: Array<any> = [ENTER, 186];
    dialogRef: MdDialogRef<AvatarEditDialogComponent>;

    @Output() personChange: EventEmitter<Person> = new EventEmitter();

    constructor(private shout: ShoutService,
                private fb: FormBuilder,
                private personService: PersonService,
                private titleService: TitleService,
                private auth: AuthService,
                private datePipe: DatePipe,
                public dialog: MdDialog) {
    }

    updateParent(): void {
        this.personChange.emit(this.person);
    }

    @Input()
    set person(value: Person) {
        this._data.next(value);
    }
    get person(): Person {
        return this._data.getValue();
    }

    ngOnInit(): void {
        this._data
            .subscribe((x: Person) => {
                if (this.person) {
                    this._pwFormControl = this.fb.control({value: undefined, disabled: this.randomPassword});
                    this._pwRandCheckbox = this.fb.control(this.randomPassword);

                    this.form = this.fb.group({
                        firstName: [this.person['firstName'],
                                    [<any>Validators.required, <any>Validators.minLength(5)]],
                        middleName: [this.person['middleName']],
                        lastName: [this.person['lastName'],
                                    [<any>Validators.required, <any>Validators.minLength(5)]],
                        email: [this.person['email'],
                            [<any>Validators.required, <any>Validators.minLength(5)]],
                        gender: [this.person['gender']],
                        maritalStatus: [this.person['maritalStatus']],
                        birthday: [this.datePipe.transform(this.person['birthday'], 'yyyy-MM-dd'),
                            [<any>Validators.required]],
                        user: this.fb.group({
                            username: [this.person['user']['username']],
                            password: this._pwFormControl,
                            noCredentials: [undefined],
                            setPassword: [undefined]
                        })
                    });
                    this.titleService.setTitle(this.person.fullName); // TODO: move this to parent
                }
            });
    }

    save(model: Person, isValid: boolean): void {
        this.submitted = true;
        model.uid = this.person.uid;
        model.id = this.person.id;
        if (isValid) {
            this.personService.updatePerson(model)
                .subscribe(
                    (person: Person) => {
                        this.person = person;
                        this.form.patchValue(person);
                        this.updateParent();
                        // this.auth.setPerson(person);
                        this.toggleRPW();
                        this.shout.success('Successfully updated "' + person.fullName + '"');
                        return true;
                    },
                    (error: any) => {
                        this.shout.error('Error while saving!');
                        return false;
                    }
                );
        }
    }

    openDlgAvatar(): void {
        let config: MdDialogConfig = new MdDialogConfig();
        config.data = {
            context: 'person',
            id: this.person.uid
        };

        this.dialogRef = this.dialog.open(AvatarEditDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: string) => {
            // console.log(result);
            // update and refesh the person being edited
            this.dialogRef = undefined;
        });
    }

    toggleRPW(): void {
        this.randomPassword = this.randomPassword ? false : true;
        if (this.randomPassword) {
            this._pwFormControl.disable();
        } else {
            this._pwFormControl.enable();
            this._pwFormControl.setValue(this.generateRandomPW());
        }
    }

    generateRandomPW(): string {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    }
}
