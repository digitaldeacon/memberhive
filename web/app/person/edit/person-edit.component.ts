import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

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

    @Input()
    set person(value: Person) {
        this._data.next(value);
    }
    get person(): Person {
        return this._data.getValue();
    }

    constructor(private fb: FormBuilder) {
    }

    // TODO: check this for performance issues.
    // It should include BehaviorSubject.takeWhile() to unsubscribe again
    ngOnInit(): void {
        this._data
            .subscribe((x: Person) => {
                if (this.person) {
                    this.myForm = this.fb.group({
                        personal: this.fb.group({
                            firstName: [this.person['firstName'],
                                        [<any>Validators.required, <any>Validators.minLength(5)]],
                            lastName: [this.person['lastName'],
                                        [<any>Validators.required, <any>Validators.minLength(5)]],
                            email: [this.person['email'],
                                [<any>Validators.required, <any>Validators.minLength(5)]],
                            gender: [this.person['gender']]
                        }),
                        user: this.fb.group({
                            username: [this.person['username'],
                                        [<any>Validators.required, <any>Validators.minLength(5)]],
                            password: [this.person['password'],
                                        [<any>Validators.required, <any>Validators.minLength(5)]]
                        })
                    });
                }
            });
    }

    save(model: Person, isValid: boolean): void {
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        // console.log(model, isValid);
    }
}
