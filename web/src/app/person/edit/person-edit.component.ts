import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {
    Person,
    PersonAddress
} from 'mh-core';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
    selector: 'mh-person-edit',
    templateUrl: 'person-edit.component.html',
    styleUrls: ['person-edit.component.scss']
})

export class PersonEditComponent {

    private _pwFormControl: FormControl;
    private _pwRandCheckbox: FormControl;

    @Input() settings: any;
    @Input()
    set person(person: Person) {
        if (person) {
            this.initForm(person);
        }
    }

    @Output() savePerson: EventEmitter<Person> = new EventEmitter<Person>();

    form: FormGroup;
    submitted: boolean;
    options: any = {};
    randomPassword: boolean = true;
    persons: Array<Person>;

    constructor(private _fb: FormBuilder,
                private _datePipe: DatePipe) {

    }

    initForm(person: Person): void {
        const address: PersonAddress = new PersonAddress(person['address']);

        this._pwFormControl = this._fb.control({value: undefined, disabled: this.randomPassword});
        this._pwRandCheckbox = this._fb.control(this.randomPassword);

        this.form = this._fb.group({
            firstName: [person['firstName'],
                [<any>Validators.required, <any>Validators.minLength(2)]],
            middleName: [person['middleName']],
            lastName: [person['lastName'],
                [<any>Validators.required, <any>Validators.minLength(2)]],
            email: [person['email'],
                [<any>Validators.required, <any>Validators.pattern(EMAIL_REGEX)]],
            gender: [person['gender']],
            maritalStatus: [person['maritalStatus']],
            birthday: [this._datePipe.transform(person['birthday'], 'yyyy-MM-dd'),
                [<any>Validators.required]],
            phoneHome: [person['phoneHome']],
            phoneWork: [person['phoneWork']],
            phoneMobile: [person['phoneMobile']],
            user: this._fb.group({
                username: [person['user']['username']],
                password: this._pwFormControl,
                noCredentials: [undefined],
                setPassword: [undefined]
            }),
            address: this._fb.group({
                home: this._fb.group({
                    street: [address.home.street],
                    zip: [address.home.zip],
                    city: [address.home.city],
                    geocode: [address.home.geocode]
                }),
                postal: this._fb.group({
                    street: [address.postal.street],
                    zip: [address.postal.zip],
                    city: [address.postal.city],
                    geocode: [address.postal.geocode]
                })
            })
        });
        this.listenFormChanges();
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

                if (this.form.valid) {
                   this.save(data);
                }
            });
    }

    save(model: Person): void {
        this.submitted = true;
        this.form.patchValue(model);
        this.toggleRandomPassword();
        this.savePerson.emit(model);
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
