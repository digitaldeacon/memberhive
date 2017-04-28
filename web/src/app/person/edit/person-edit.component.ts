import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
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

export class PersonEditComponent implements OnInit {

    private _pwFormControl: FormControl;
    private _pwRandCheckbox: FormControl;

    form: FormGroup;
    submitted: boolean;
    mStatus: any[] = [ // TODO: move this to the system settings in the options table
        {value: 'single', viewValue: 'Single'},
        {value: 'married', viewValue: 'Married'},
        {value: 'widdow', viewValue: 'Widdow'},
        {value: 'divorce-living', viewValue: 'Living in Divorce'},
        {value: 'divorce-active', viewValue: 'Divorced'}
    ];
    randomPassword: boolean = true;
    persons: Array<Person>;

    constructor(private shout: ShoutService,
                private fb: FormBuilder,
                private auth: AuthService,
                private datePipe: DatePipe) {
    }

    @Input() person: Person;
    @Output() edit: EventEmitter<Person> = new EventEmitter<Person>();

    updateParent(): void {
        this.edit.emit(this.person);
    }

    ngOnInit(): void {
        if (this.person) {
            const address: PersonAddress = new PersonAddress(this.person['address']);

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
                phoneHome: [this.person['phoneHome']],
                phoneWork: [this.person['phoneWork']],
                phoneMobile: [this.person['phoneMobile']],
                user: this.fb.group({
                    username: [this.person['user']['username']],
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
    }

    save(model: Person, isValid: boolean): void {
        const oldAttributes: Person = this.person;
        this.submitted = true;
        model.uid = this.person.uid;
        model.id = this.person.id;
        if (isValid) {
            this.person = model;
            this.form.patchValue(model);
            this.updateParent();
            if (model.uid === this.auth.getCurrentUser().uid) {
                this.auth.setCurrentUser(model); // i.e. update my own card
            }
            this.toggleRandomPassword();
            this.shout.success('Successfully updated ' + model.fullName);
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
