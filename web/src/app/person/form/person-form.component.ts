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
    Person,
    PersonAddress,
    Tag
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
    @Input() tagSource: Tag[];
    @Input()
    set person(person: Person) {
        if (person) {
            this.initForm();
            this.initValidators();
            this.initPerson(person);
        }
    }

    @Output() savePerson: EventEmitter<Person> = new EventEmitter<Person>();
    @Output() saveStatus: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

    form: FormGroup;
    submitted: boolean;
    randomPassword: boolean = true;
    persons: Array<Person>;
    address: PersonAddress = new PersonAddress();
    // TMP placeholders until in store
    statusTagsSelected: Tag[] = [];
    // */

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
            // TODO: either have core return date objects or use a dateadapter
            person.birthday = new Date(person.birthday);
            person.baptized = new Date(person.baptized);
            person.anniversary = new Date(person.anniversary);
            // console.log(person, this.tagSource);
            // this.statusTagsSelected = person.status;
            this.form.patchValue(person);
            this.listenFormChanges();
            this._person = person;
            if (person.address.hasOwnProperty('home') && person.address.home.hasOwnProperty('geocode')) {
                this.hasMap = Object.keys(person.address.home.geocode).length > 0;
            }
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
                console.log(data);
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

    save(model: Person): void {
        if (this.form.valid) {
            this.submitted = true;
            this.form.patchValue(model);
            this.toggleRandomPassword();
            this.savePerson.emit(model);
        }
    }

    changeStatus($event: Tag[]): void {
        this._person.status = [...$event];
        this.saveStatus.emit($event);
    }

    inCreateMode(): boolean {
        return this._mode === 'CREATE';
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
