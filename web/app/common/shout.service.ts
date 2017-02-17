import { Component, Injectable } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class ShoutService {
    actionButtonLabel: string = 'OK';
    action: boolean = true;
    setAutoHide: boolean = true;
    autoHide: number = 6000;
    addExtraClass: boolean = false;

    constructor(public snackBar: MdSnackBar) {}

    out(message: string, type: string): void {
        let config: MdSnackBarConfig = new MdSnackBarConfig();
        config.duration = this.autoHide;
        config.extraClasses = ['shout-' + type];
        this.snackBar.open(message, this.action && this.actionButtonLabel, config);
    }
    error(message: string): void {
        this.out(message, 'warn');
    }
    success(message: string): void {
        this.out(message, 'success');
    }
}
