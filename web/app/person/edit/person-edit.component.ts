import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';

import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

import { TitleService } from "../../common/title.service";
import { ShoutService } from "../../common/shout.service";
import { PersonService } from "../person.service";
import { Person } from '../person';

@Component({
    selector: 'mh-person-edit',
    templateUrl: 'person-edit.component.html',
    styleUrls: ['person-edit.component.scss']
})

export class PersonEditComponent implements OnInit {

    private _data: any = new BehaviorSubject<Person[]>([]);
    public myForm: FormGroup;  // our model driven form
    public submitted: boolean;  // keep track on whether form is submitted
    public events: any[] = [];  // use later to display form changes
    public mStatus: any[] = [
        {value: 'single', viewValue: 'Single'},
        {value: 'married', viewValue: 'Married'},
        {value: 'widdow', viewValue: 'Widdow'},
        {value: 'divorce-living', viewValue: 'Living in Divorce'},
        {value: 'divorce-active', viewValue: 'Divorced'}
    ];

    @Input()
    set person(value: Person) {
        this._data.next(value);
    }
    get person(): Person {
        return this._data.getValue();
    }
    @Output() personChange: EventEmitter<Person> = new EventEmitter();
    updateParent(): void {
        this.personChange.emit(this.person);
    }

    constructor(private shout: ShoutService,
                private fb: FormBuilder,
                private personService: PersonService,
                private titleService: TitleService) {
    }

    // TODO: check this for performance issues.
    // It should include BehaviorSubject.takeWhile() to unsubscribe again
    ngOnInit(): void {
        this._data
            .subscribe((x: Person) => {
                if (this.person) {
                    this.myForm = this.fb.group({
                        firstName: [this.person['firstName'],
                                    [<any>Validators.required, <any>Validators.minLength(5)]],
                        middleName: [this.person['middleName']],
                        lastName: [this.person['lastName'],
                                    [<any>Validators.required, <any>Validators.minLength(5)]],
                        email: [this.person['email'],
                            [<any>Validators.required, <any>Validators.minLength(5)]],
                        gender: [this.person['gender']],
                        maritalStatus: [this.person['maritalStatus']],
                        birthday: [this.person['birthday'],
                            [<any>Validators.required]],
                        user: this.fb.group({
                            username: [this.person['username']],
                            password: [this.person['password']]
                        })
                    });
                    this.titleService.setTitle('Person: ' + this.person.fullName); // TODO: move this to parent
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
                        this.myForm.patchValue(person);
                        this.updateParent();
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
}
