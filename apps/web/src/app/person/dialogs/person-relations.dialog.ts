import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "mh-dialog-person-relations",
  templateUrl: "./person-relations.dialog.html"
})
export class PersonRelationsDialogComponent {
  constructor(public dialogRef: MatDialogRef<PersonRelationsDialogComponent>) {}
}
