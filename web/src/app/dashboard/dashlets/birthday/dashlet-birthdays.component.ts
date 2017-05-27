import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';

import { Person } from 'mh-core';
import { DashletEditDialogComponent } from './dashlet-birthdays-edit.dialog';

@Component({
    selector: 'mh-dashlet-birthdays',
    templateUrl: './dashlet-birthdays.component.html',
    styleUrls: ['./dashlet-birthdays.component.scss']
})
export class DashletBirthdaysComponent {
    private now: Date = new Date();

    @Input()
    set people(p: Person[]) {
        this.peopleStore = p;
        this.filter(p);
    }
    @Input() user: Person;

    peopleStore: Array<Person>;
    peopleBdRange: Array<Person>;
    peopleBdToday: Array<Person>;

    range: number = 7;
    dialogRef: MdDialogRef<any>;

    constructor(private _dialog: MdDialog,
                private _ref: ChangeDetectorRef) { }

    filter(people: Person[]): void {
        if (people) {
            let rangeDate: Date = new Date(this.now);
            rangeDate.setDate(new Date(this.now).getDate() + this.range);
            this.peopleBdRange = people.filter((p: Person) => {
                const bday: Date = new Date(p.birthday);
                if (!p.birthday) {
                    return false;
                }
                bday.setFullYear(this.now.getFullYear());
                return bday > this.now && bday < rangeDate;
            });
            this.peopleBdRange.sort((p1: Person, p2: Person) => {
                const left: number = new Date(p1.birthday).getDate();
                const right: number = new Date(p2.birthday).getDate();
                return left - right;
            });
            // Filter for today's birthdays
            this.peopleBdToday = people.filter((p: Person) => {
                const bday: Date = new Date(p.birthday);
                if (!p.birthday) {
                    return false;
                }
                bday.setFullYear(this.now.getFullYear());
                return bday.toLocaleDateString() === this.now.toLocaleDateString();
            });
            // Sort it, closest date on top
            this.peopleBdToday.sort((p1: Person, p2: Person) => {
                const left: number = new Date(p1.birthday).getDate();
                const right: number = new Date(p2.birthday).getDate();
                return left - right;
            });
        }
    }

    settingsDlg(): void {
        const config: MdDialogConfig = new MdDialogConfig();
        config.data = {
            range: this.range
        };
        this.dialogRef = this._dialog.open(DashletEditDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: string) => {
            const range: number = +result;
            if (range && range !== this.range) {
                this.range = range;
                this.filter(this.peopleStore);
                this._ref.detectChanges();
            }
            this.dialogRef = undefined;
        });
    }

    // could become a pipe, in case momentjs does not work with AOT
    birthdayIn(birthday: string): number  {
        const bDay: Date = new Date(birthday);
        bDay.setFullYear(this.now.getFullYear());
        const interval: number = Math.floor(bDay.getTime() - this.now.getTime()) / 1000;
        const days: number = Math.ceil(interval / 86400);
        return days;
    }
}
