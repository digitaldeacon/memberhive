import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MessageType } from '@memberhivex/core';

@Injectable()
export class ShoutService {
  actionButtonLabel: string = 'OK';
  action: boolean = true;
  autoHide: number = 3000;

  constructor(private _snackBar: MatSnackBar) {}

  out(message: string, type?: MessageType): MatSnackBarRef<SimpleSnackBar> {
    const config: MatSnackBarConfig = new MatSnackBarConfig();
    config.duration = this.autoHide;
    if (type) {
      config.panelClass = ['shout-' + type];
    }
    return this._snackBar.open(message, this.actionButtonLabel, config);
  }
  error(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this.out(message, MessageType.FAILURE);
  }
  success(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this.out(message, MessageType.SUCCESS);
  }
}
