import { Component, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'mh-dialog-person-relations',
    templateUrl: './person-relations.dialog.html'
})
export class PersonRelationsDialogComponent {
    constructor(
        public dialogRef: MdDialogRef<PersonRelationsDialogComponent>) { }
}
