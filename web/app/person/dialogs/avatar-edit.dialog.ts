import { Component, ViewChild } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { PersonService } from "../person.service";

@Component({
    selector: 'mh-dialog-avatar-edit',
    templateUrl: './avatar-edit.dialog.html',
    styleUrls: ['./avatar-edit.dialog.scss']
})
export class AvatarEditDialogComponent {
    data: any;
    cropperSettings: CropperSettings;
    file: File;
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor(private personService: PersonService,
        public dialogRef: MdDialogRef<AvatarEditDialogComponent>) {

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.rounded = true;

        this.cropperSettings.minHeight = 200;
        this.cropperSettings.minWidth = 200;

        this.data = {};
    }

    fileChangeListener($event: any): void {
        let image: any = new Image();
        let myReader: FileReader = new FileReader();
        this.file = $event;
        let that: AvatarEditDialogComponent = this;

        myReader.onloadend = function(loadEvent: any): void {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };

        myReader.readAsDataURL(this.file);
    }

    save(): void {
        // console.log(this.file);
        this.personService.uploadAvatar(this.file).subscribe((response: any) => {
            // console.log(response);
        });
    }
}
