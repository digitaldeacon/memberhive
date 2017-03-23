import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { PersonService } from "../person.service";
import { Person } from "../person";

@Component({
    selector: 'mh-dialog-avatar-edit',
    templateUrl: './avatar-edit.dialog.html',
    styleUrls: ['./avatar-edit.dialog.scss']
})
export class AvatarEditDialogComponent implements OnInit {
    imageData: any;
    avatar: HTMLImageElement;
    cropperSettings: CropperSettings;
    file: File;
    @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

    constructor(private personService: PersonService,
                public dialogRef: MdDialogRef<AvatarEditDialogComponent>,
                @Inject(MD_DIALOG_DATA) public dialogData: any) {

        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.rounded = true;

        this.cropperSettings.width = 400;
        this.cropperSettings.height = 400;
        this.cropperSettings.croppedWidth = 400;
        this.cropperSettings.croppedHeight = 400;

        this.imageData = {};
    }

    ngOnInit(): void {
        if (this.dialogData.avatar) {
            this.avatar = new Image();
            this.avatar.src = this.dialogData.avatar;
            this.avatar.addEventListener('load', (data: any) => {
                this.cropper.setImage(this.avatar);
                this.imageData.image = this.avatar;
                // this.file = new File(this.avatar,this.dialogData.avatar);
            });
        }
    }

    fileChangeListener($event: any): void {
        let image: any = new Image();
        let myReader: FileReader = new FileReader();
        this.file = $event.target.files[0]; // $event;
        let that: AvatarEditDialogComponent = this;

        myReader.onloadend = function(loadEvent: any): void {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
        };
        myReader.readAsDataURL(this.file);
    }

    save(): void {
        let image: Object = {
            base: JSON.stringify(this.imageData.image),
            id: this.dialogData.id
            // type: this.file.type
        };
        if (this.dialogData.context === 'person') {
            this.personService.uploadAvatar(image).subscribe(
                (person: Person) => {
                    // send person to parent component and close
                    this.dialogRef.close(person);
                    return true;
                },
                (error: any) => {
                    // send error and close
                    this.dialogRef.close();
                    return false;
                }
            );
        }
    }
}
