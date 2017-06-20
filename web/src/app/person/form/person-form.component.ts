import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {
    Person,
    PersonAddress
} from 'mh-core';

const EMAIL_REGEX_1 = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))';
const EMAIL_REGEX_2 = '@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
const EMAIL_REGEX = new RegExp(EMAIL_REGEX_1 + EMAIL_REGEX_2);

@Component({
    selector: 'mh-person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonFormComponent implements OnInit {

    private _pwFormControl: FormControl;
    private _pwRandCheckbox: FormControl;

    @Input() settings: any;
    @Input()
    set person(person: Person) {
        if (person) {
            this.initForm();
            this.initPerson(person);
            this.initValidators();
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
            this.initForm();
            this.initValidators();
        }
    }

    initPerson(person?: Person): void {
        if (person) {
            this.address = new PersonAddress(person['address']);
            this.form.patchValue(person);
            this.listenFormChanges();
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
            .debounceTime(600)
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

    calcGeocode(address: any): boolean {
        const column: any = {
            name: '',
            value: ''
        };
        let adr: string;

        adr = address.home.street ? address.home.street : '';
        adr += address.home.zip ? ', ' + address.home.zip : '';
        adr += address.home.city ? ' ' + address.home.city : '';

        /* this.personService.geocode(adr).subscribe(
            (data: any) => {
                address.home.geocode = data.results[0].geometry.location;
            },
            (error: any) => {
                this._shout.error('Error while saving geocode data!');
                return false;
            },
            () => {
                column.name = 'address';
                column.value = address;
                this.personService.updateColumn(column, this.person.uid)
                    .subscribe(
                        (person: Person) => {
                            this.person = person;
                            this.form.patchValue(person.address);
                            this.updateParent();
                        },
                            (error: any) => {
                                this._shout.error('Error while updating address with geocodes!');
                                return false;
                        }
                    );
            }
        ); */
        return false;
    }

    toggleRandomPassword(event?: any): void {
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
