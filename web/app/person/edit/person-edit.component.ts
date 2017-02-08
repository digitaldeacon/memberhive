import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

import { Person } from '../person';

@Component({
    selector: 'mh-person-edit',
    templateUrl: 'person-edit.component.html',
    styleUrls: ['person-edit.component.scss']
})

export class PersonEditComponent implements OnInit {
    public myForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes
    public data:any;

    cropperSettings:CropperSettings;
    @ViewChild('cropper', undefined) cropper:ImageCropperComponent;

    @Input('person') person: Person;

    constructor(private fb: FormBuilder) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.width = 200;
        this.cropperSettings.height = 200;
        this.cropperSettings.keepAspect = false;

        this.cropperSettings.croppedWidth = 200;
        this.cropperSettings.croppedHeight = 200;

        this.cropperSettings.canvasWidth = 500;
        this.cropperSettings.canvasHeight = 300;

        this.cropperSettings.minWidth = 100;
        this.cropperSettings.minHeight = 100;

        this.cropperSettings.rounded = true;
        this.cropperSettings.minWithRelativeToResolution = false;

        this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
        this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
        this.cropperSettings.noFileInput = true;

        this.data = {};
    }

    ngOnInit() {
        // we will initialize our form model here
        console.log(this.person);
        this.myForm = this.fb.group({
            personal: this.fb.group({
                firstName: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
                lastName: ['', [<any>Validators.required, <any>Validators.minLength(5)]]
            }),
            account: this.fb.group({
                username: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
                password: ['', [<any>Validators.required, <any>Validators.minLength(5)]]
            })
        });
    }

    save(model: Person, isValid: boolean) {
        this.submitted = true; // set form submit to true
        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }

    fileChangeListener($event) {
        var image:any = new Image();
        var file:File = $event.target.files[0];
        var myReader:FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent:any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);

        };
        myReader.readAsDataURL(file);
    }
}