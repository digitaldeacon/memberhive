import { Component, Injectable } from '@angular/core';
import {
    MdSnackBar,
    MdSnackBarConfig,
    MdSnackBarRef,
    SimpleSnackBar } from '@angular/material';

@Injectable()
export class ShoutService {
    actionButtonLabel: string = 'OK';
    action: boolean = true;
    setAutoHide: boolean = true;
    autoHide: number = 6000;
    addExtraClass: boolean = false;

    constructor(private _snackBar: MdSnackBar) {}

    out(message: string, type?: string): MdSnackBarRef<SimpleSnackBar> {
        let config: MdSnackBarConfig = new MdSnackBarConfig();
        config.duration = this.autoHide;
        if (type) {
            config.extraClasses = ['shout-' + type];
        }
        return this._snackBar.open(message, this.actionButtonLabel, config);
    }
    error(message: string): MdSnackBarRef<SimpleSnackBar> {
        return this.out(message, 'failure');
    }
    success(message: string): MdSnackBarRef<SimpleSnackBar> {
        return this.out(message, 'success');
    }
}
