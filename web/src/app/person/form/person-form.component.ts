import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import {
    Person, PersonAddress, Tag, FormStatus,
    MaritalStatus, maritalStatusArray
} from 'mh-core';

import * as _moment from 'moment';
const moment = _moment;

@Component({
    selector: 'mh-person-form',
    templateUrl: './person-form.component.html',
    styleUrls: ['./person-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PersonFormComponent implements OnInit {

    private _pwFormControl: FormControl;
    private _pwRandCheckbox: FormControl;
    private _person: Person;

    maritalStatus: MaritalStatus[] = maritalStatusArray;
    mode: FormStatus = FormStatus.EDIT;
    hasMap: boolean = false;

    @Input() settings: any;
    @Input() tagSource: Tag[];
    @Input()
    set person(person: Person) {
        if (person) {
            this.initForm();
            this.initValidators();
            this.initPerson(person);
        }
    }
    get person(): Person {
        return this._person;
    }

    @Output() savePerson: EventEmitter<Person> = new EventEmitter<Person>();
    @Output() saveStatus: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

    form: FormGroup;
    submitted: boolean;
    randomPassword: boolean = true;
    persons: Array<Person>;
    address: PersonAddress = new PersonAddress();
    emailRegex: RegExp;

    constructor(private _fb: FormBuilder) {
        const regex = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))';
        const regex2 = '@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
        this.emailRegex = new RegExp(regex + regex2);
    }

    ngOnInit(): void {
        if (!this.form) {
            this.mode = FormStatus.CREATE;
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
            if (person.address.hasOwnProperty('home') &&
                person.address.home.hasOwnProperty('geocode')) {
                this.hasMap = Object.keys(person.address.home.geocode).length > 0;
            }
        }
    }

    initValidators(): void {
        this.form.get('firstName').setValidators([<any>Validators.required, <any>Validators.minLength(2)]);
        this.form.get('lastName').setValidators([<any>Validators.required, <any>Validators.minLength(2)]);
        this.form.get('email').setValidators([<any>Validators.required, <any>Validators.pattern(this.emailRegex)]);
        this.form.get('gender').setValidators([<any>Validators.required]);
    }

    initForm(): void {
        this._pwFormControl = this._fb.control({value: undefined, disabled: this.randomPassword});
        this._pwRandCheckbox = this._fb.control(this.randomPassword);

        this.form = this._fb.group({
            firstName: [''],
            middleName: [''],
            lastName: [''],
            status: [undefined],
            email: [''],
            gender: [undefined],
            maritalStatus: [undefined],
            birthday: [undefined],
            baptized: [undefined],
            anniversary: [undefined],
            phoneHome: [''],
            phoneWork: [''],
            phoneMobile: [''],
            user: this._fb.group({
                username: [''],
                password: this._pwFormControl,
                setPassword: [{value: undefined, disabled: true}],
                noCredentials: [{value: undefined, disabled: true}]
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
            .debounceTime(2000)
            .distinctUntilChanged()
            .subscribe((data: Person) => {
                const userCtrl: any = (<any>this.form).get('user').controls;
                if (!this.submitted) {
                    if (userCtrl.setPassword.value) {
                        userCtrl.username.setValidators([<any>Validators.required, <any>Validators.minLength(4)]);
                        userCtrl.username.updateValueAndValidity();
                    } else {
                        userCtrl.username.setValidators(undefined);
                        userCtrl.username.updateValueAndValidity();
                    }
                    this.save(data);
                }
                this.submitted = false;
            });
    }

    onKey(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.submitted = true;
            this.save(this.form.getRawValue());
        }
    }

    save(person: Person): void {
        console.log('Form valid?:', this.form.valid);
        if (this.form.valid) {
            this.submitted = true;
           
            person.birthday = person.birthday ? moment(person.birthday) : undefined;
            person.baptized = person.baptized ? moment(person.baptized) : undefined;
            person.anniversary = person.anniversary ? moment(person.anniversary) : undefined;

            this.form.patchValue(person);
            this.toggleRandomPassword();
            this.savePerson.emit(person);
        } else {
            console.log(this.form.errors, this.form.getRawValue());
        }
    }

    changeStatus($event: Tag[]): void {
        this.person.status = [...$event];
        this.saveStatus.emit($event);
    }

    inCreateMode(): boolean {
        return this.mode === FormStatus.CREATE;
    }

    toggleRandomPassword(event?: any): void {
        this.randomPassword = this.randomPassword ? false : true;
        if (this.randomPassword) {
            this._pwFormControl.disable();
            this._pwFormControl.setValue('');
        } else if (this.form.get('user.username').value) {
            this._pwFormControl.enable();
            this._pwFormControl.setValue(this.generateRandomPW());
        }
    }

    enablePasswordFields(): void {
        if (this.form.get('user.username').value.length > 3) {
            this.form.get('user.setPassword').enable();
            this.form.get('user.noCredentials').enable();
        } else {
            if (!this.form.get('user.setPassword').disabled) {
                this.form.get('user.setPassword').disable();
                this.form.get('user.noCredentials').disable();
            }
        }
    }

    generateRandomPW(): string {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    }
}
