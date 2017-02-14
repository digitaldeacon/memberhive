import {Component, Inject} from '@angular/core';
import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'person-relations-dialog',
    templateUrl: './person-relations.dialog.html'
})
export class PersonRelationsDialog {
    constructor(
        public dialogRef: MdDialogRef<PersonRelationsDialog>) { }
}