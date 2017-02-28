import {Component, Inject} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'mh-dialog-dashlet-edit',
    templateUrl: './dashlet-edit.dialog.html'
})
export class DashletEditDialogComponent {
    constructor(
        @Inject(MD_DIALOG_DATA) public dialogData: any,
        public dialogRef: MdDialogRef<DashletEditDialogComponent>) { }

    save(): void {
        // saving settings data
    }
}
