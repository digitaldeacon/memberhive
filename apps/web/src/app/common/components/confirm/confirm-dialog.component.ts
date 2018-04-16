import { MatDialogRef } from "@angular/material";
import { Component } from "@angular/core";

@Component({
  selector: "mh-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"]
})
export class ConfirmDialogComponent {
  public title: string;
  public message: string;

  constructor(private _dialogRef: MatDialogRef<ConfirmDialogComponent>) {}

  close(result?: any): void {
    if (result) {
      this._dialogRef.close(result);
    } else {
      this._dialogRef.close();
    }
  }
}
