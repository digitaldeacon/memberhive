import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { ShoutService } from '../../common/shout.service';
import {
    AuthService,
    Person,
    PersonAddress
} from 'mh-core';

@Component({
    selector: 'mh-person-edit',
    templateUrl: 'person-edit.component.html',
    styleUrls: ['person-edit.component.scss']
})

export class PersonEditComponent {

    private _pwFormControl: FormControl;
    private _pwRandCheckbox: FormControl;

    public form: FormGroup;
    @Input()
    set person(person: Person) {
        if (person) {
            // this.form.patchValue(person);
            this.initForm(person);
        }
    };
    @Output() edit: EventEmitter<Person> = new EventEmitter<Person>();

    submitted: boolean;
    options: any = {};
    randomPassword: boolean = true;
    persons: Array<Person>;

    constructor(private shout: ShoutService,
                private fb: FormBuilder,
                private auth: AuthService,
                private datePipe: DatePipe) {
        this.options = { // TODO: pull this from the settings table/store
            marital: [
                {value: 'single', viewValue: 'Single'},
                {value: 'married', viewValue: 'Married'},
                {value: 'widdow', viewValue: 'Widdow'},
                {value: 'divorce-living', viewValue: 'Living in Divorce'},
                {value: 'divorce-active', viewValue: 'Divorced'}
            ]
        };
    }

    updateParent(): void {
        this.edit.emit(this.person);
    }

    initForm(person: Person): void {
        const address: PersonAddress = new PersonAddress(person['address']);

        this._pwFormControl = this.fb.control({value: undefined, disabled: this.randomPassword});
        this._pwRandCheckbox = this.fb.control(this.randomPassword);

        this.form = this.fb.group({
            firstName: [person['firstName'],
                [<any>Validators.required, <any>Validators.minLength(5)]],
            middleName: [person['middleName']],
            lastName: [person['lastName'],
                [<any>Validators.required, <any>Validators.minLength(5)]],
            email: [person['email'],
                [<any>Validators.required, <any>Validators.minLength(5)]],
            gender: [person['gender']],
            maritalStatus: [person['maritalStatus']],
            birthday: [this.datePipe.transform(person['birthday'], 'yyyy-MM-dd'),
                [<any>Validators.required]],
            phoneHome: [person['phoneHome']],
            phoneWork: [person['phoneWork']],
            phoneMobile: [person['phoneMobile']],
            user: this.fb.group({
                username: [person['user']['username']],
                password: this._pwFormControl,
                noCredentials: [undefined],
                setPassword: [undefined]
            }),
            address: this.fb.group({
                home: this.fb.group({
                    street: [address.home.street],
                    zip: [address.home.zip],
                    city: [address.home.city],
                    geocode: [address.home.geocode]
                }),
                postal: this.fb.group({
                    street: [address.postal.street],
                    zip: [address.postal.zip],
                    city: [address.postal.city],
                    geocode: [address.postal.geocode]
                })
            })
        });
    }

    save(model: Person, isValid: boolean): void {
        const oldAttributes: Person = this.person;
        this.submitted = true;
        model.uid = this.person.uid;
        model.id = this.person.id;
        /*if (isValid) {
            this.person = model;
            this.form.patchValue(model);
            this.updateParent();
            if (model.uid === this.auth.getCurrentUser().uid) {
                this.auth.setCurrentUser(model); // i.e. update my own card
            }
            this.toggleRandomPassword();
            this.shout.success('Successfully updated ' + model.fullName);
        }*/
        // this._store.dispatch({type: 'SAVE_PERSON', payload: model});
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
                this.shout.error('Error while saving geocode data!');
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
                                this.shout.error('Error while updating address with geocodes!');
                                return false;
                        }
                    );
            }
        ); */
        return false;
    }

    toggleRandomPassword(): void {
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
