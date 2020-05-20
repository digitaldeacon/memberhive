import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './components/confirm/confirm-dialog.component';
import { LoginDialogComponent } from '../login/components/login-dialog/login-dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
  constructor(private _dialog: MatDialog) {}

  confirm(title: string, message: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmDialogComponent>;

    dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

  login(message?: string): Observable<boolean> {
    let dialogRef: MatDialogRef<LoginDialogComponent>;
    const config: MatDialogConfig = new MatDialogConfig();

    config.disableClose = true;

    dialogRef = this._dialog.open(LoginDialogComponent, config);
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
