import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {
    Person,
    PersonAddress
} from 'mh-core';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'mh-person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonFormComponent implements OnInit {

    private _pwFormControl: FormControl;
    private _pwRandCheckbox: FormControl;
    private _mode: string = 'EDIT';
    private _person: Person;

    hasMap: boolean = false;

    @Input() settings: any;
    @Input()
    set person(person: Person) {
        if (person) {
            this.initForm();
            this.initValidators();
            this.initPerson(person);
        }
    }

    @Output() savePerson: EventEmitter<Person> = new EventEmitter<Person>();

    form: FormGroup;
    submitted: boolean;
    randomPassword: boolean = true;
    persons: Array<Person>;
    address: PersonAddress = new PersonAddress();

    constructor(private _fb: FormBuilder) { }

    ngOnInit(): void {
        if (!this.form) {
            this._mode = 'CREATE';
            this.initForm();
            this.initValidators();
        }
    }

    initPerson(person?: Person): void {
        if (person) {
            this.address = new PersonAddress(person['address']);
            this.form.patchValue(person);
            this.listenFormChanges();
            this._person = person;
            this.hasMap = Object.keys(person.address.home.geocode).length > 0;
        }
    }

    initValidators(): void {
        this.form.get('firstName').setValidators([<any>Validators.required, <any>Validators.minLength(2)]);
        this.form.get('lastName').setValidators([<any>Validators.required, <any>Validators.minLength(2)]);
        this.form.get('email').setValidators([<any>Validators.required, <any>Validators.pattern(EMAIL_REGEX)]);
        this.form.get('birthday').setValidators([<any>Validators.required]);
    }

    initForm(): void {
        this._pwFormControl = this._fb.control({value: undefined, disabled: this.randomPassword});
        this._pwRandCheckbox = this._fb.control(this.randomPassword);

        this.form = this._fb.group({
            firstName: ['', ],
            middleName: [''],
            lastName: [''],
            email: [''],
            gender: [undefined],
            maritalStatus: [undefined],
            birthday: [undefined],
            phoneHome: [''],
            phoneWork: [''],
            phoneMobile: [''],
            user: this._fb.group({
                username: [''],
                password: this._pwFormControl,
                noCredentials: [undefined],
                setPassword: [undefined]
            }),
            address: this._fb.group({
                home: this._fb.group({
                    street: [this.address.home.street],
                    zip: [this.address.home.zip],
                    city: [this.address.home.city],
                    geocode: [this.address.home.geocode]
                }),
                postal: this._fb.group({
                    street: [this.address.postal.street],
                    zip: [this.address.postal.zip],
                    city: [this.address.postal.city],
                    geocode: [this.address.postal.geocode]
                })
            })
        });
    }

    listenFormChanges(): void {
        this.form.valueChanges
            .debounceTime(800)
            .distinctUntilChanged()
            .subscribe((data: Person) => {
                const userCtrl: any = (<any>this.form).get('user').controls;
                if (userCtrl.setPassword.value) {
                    userCtrl.username.setValidators([<any>Validators.required, <any>Validators.minLength(4)]);
                    userCtrl.username.updateValueAndValidity();
                } else {
                    userCtrl.username.setValidators(undefined);
                    userCtrl.username.updateValueAndValidity();
                }
                this.save(data, this.form.valid);
            });
    }

    save(model: Person, valid: boolean): void {
        if (this.form.valid) {
            this.submitted = true;
            this.form.patchValue(model);
            this.toggleRandomPassword();
            this.savePerson.emit(model);
        }
    }

    inCreateMode(): boolean {
        return this._mode === 'CREATE';
    }

    toggleRandomPassword(event?: any): void {
        this.randomPassword = this.randomPassword ? false : true;
        if (this.randomPassword) {
            this._pwFormControl.disable();
        } else if (this.form.get('user.username').value) {
            this._pwFormControl.enable();
            this._pwFormControl.setValue(this.generateRandomPW());
        }
    }

    generateRandomPW(): string {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    }
}
