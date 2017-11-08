import { Injectable } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarConfig,
    MatSnackBarRef,
    SimpleSnackBar } from '@angular/material';

@Injectable()
export class ShoutService {
    actionButtonLabel: string = 'OK';
    action: boolean = true;
    setAutoHide: boolean = true;
    autoHide: number = 6000;
    addExtraClass: boolean = false;

    constructor(private _snackBar: MatSnackBar) {}

    out(message: string, type?: string): MatSnackBarRef<SimpleSnackBar> {
        const config: MatSnackBarConfig = new MatSnackBarConfig();
        config.duration = this.autoHide;
        if (type) {
            config.extraClasses = ['shout-' + type];
        }
        return this._snackBar.open(message, this.actionButtonLabel, config);
    }
    error(message: string): MatSnackBarRef<SimpleSnackBar> {
        return this.out(message, 'failure');
    }
    success(message: string): MatSnackBarRef<SimpleSnackBar> {
        return this.out(message, 'success');
    }
}
