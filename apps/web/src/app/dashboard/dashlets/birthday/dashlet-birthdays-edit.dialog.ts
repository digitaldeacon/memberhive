import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mh-dialog-dashlet-birthday-edit',
  templateUrl: './dashlet-birthdays-edit.dialog.html'
})
export class DashletEditDialogComponent implements OnInit {
  range: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<DashletEditDialogComponent>
  ) {}

  ngOnInit(): void {
    if (this.dialogData.range) {
      this.range = this.dialogData.range;
    }
  }

  save(value: number): void {
    if (value > 0) {
      this.dialogRef.close(value);
    }
  }
}
