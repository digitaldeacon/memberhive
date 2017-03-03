import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ENTER } from "@angular/material";

import { TitleService } from "../../common/title.service";
import { ShoutService } from "../../common/shout.service";
import { PersonService } from "../person.service";
import { AuthService } from '../../common/auth/auth.service';
import { Person, PersonAddress } from '../person';

@Component({
    selector: 'mh-person-edit',
    templateUrl: 'person-edit.component.html',
    styleUrls: ['person-edit.component.scss']
})

export class PersonEditComponent implements OnInit {

    private _data: any = new BehaviorSubject<Person[]>([]);
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
    separatorKeys: Array<any> = [ENTER, 186]; // for the chip list, separators
    persons: Array<Person>;

    @Output() personChange: EventEmitter<Person> = new EventEmitter();

    constructor(private shout: ShoutService,
                private fb: FormBuilder,
                private personService: PersonService,
                private titleService: TitleService,
                private auth: AuthService,
                private datePipe: DatePipe) {
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
                    let address: PersonAddress = new PersonAddress(this.person['address']);

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
                        }),
                        address: this.fb.group({
                            home: this.fb.group({
                                street: [address.home.street],
                                zip: [address.home.zip],
                                city: [address.home.city]
                            }),
                            postal: this.fb.group({
                                street: [address.postal.street],
                                zip: [address.postal.zip],
                                city: [address.postal.city]
                            })
                        })
                    });
                    this.titleService.setTitle(this.person.fullName); // TODO: move this to parent
                }
            });
        /* this.personService.getPersons()
            .subscribe((persons: Array<Person>) => this.persons = persons); */
    }

    save(model: Person, isValid: boolean): void {
        this.submitted = true;
        model.uid = this.person.uid;
        model.id = this.person.id;
        this.calcGeocode(model.address);
        if (isValid) {
            this.personService.updatePerson(model)
                .subscribe(
                    (person: Person) => {
                        this.person = person;
                        this.form.patchValue(person);
                        this.updateParent();
                        if (person.uid === this.auth.getCurrentUser().uid) {
                            this.auth.setCurrentUser(person); // i.e. update my own card
                        }
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

    calcGeocode(address: any): boolean {
        let adr: string;

        if (address === this.person.address) {
            return true;
        }

        adr = address.home.street ? address.home.street : '';
        adr += address.home.zip ? ', ' + address.home.zip : '';
        adr += address.home.city ? ' ' + address.home.city : '';

        this.personService.geocode(adr).subscribe(
            (data: any) => {
                address.home.geocode = data.results[0].geometry.location;
                // update db from here
                return true;
            }
        );
        return false;
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
