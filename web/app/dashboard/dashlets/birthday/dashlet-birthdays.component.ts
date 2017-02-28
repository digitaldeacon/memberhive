import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { Person } from '../../../person/person';
import { DashletEditDialogComponent } from '../dashlet-edit.dialog';

@Component({
    selector: 'mh-dashlet-birthdays',
    templateUrl: './dashlet-birthdays.component.html',
    styleUrls: ['./dashlet-birthdays.component.scss']
})
export class DashletBirthdaysComponent implements OnChanges {

    private now: Date = new Date();
    private rangeDate: Date;

    @Input() persons: Array<Person>;
    personsBdRange: Array<Person>;
    personsBdToday: Array<Person>;

    range: number = 7; // TODO: get this from user settings
    dialogRef: MdDialogRef<DashletEditDialogComponent>;

    constructor(public dialog: MdDialog) {
        this.rangeDate = new Date(this.now);
        this.rangeDate.setDate(this.rangeDate.getDate() + this.range);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['persons']) {
            if (this.persons) {
                // Filter for birthdays within a range (default 7 days)
                this.personsBdRange = this.persons.filter((p: Person) => {
                    let bday: Date = p.birthday;
                    bday.setFullYear(this.now.getFullYear());
                    if (!p.birthday) {
                        return false;
                    }
                    return bday > this.now && bday < this.rangeDate;
                });
                this.personsBdRange.sort((p1: Person, p2: Person) => {
                    let left: number = Number(p1.birthday);
                    let right: number = Number(p2.birthday);
                    return left - right;
                });
                // Filter for today's birthdays
                this.personsBdToday = this.persons.filter((p: Person) => {
                    let bday: Date = p.birthday;
                    bday.setFullYear(this.now.getFullYear());
                    if (!p.birthday) {
                        return false;
                    }
                    return bday.toLocaleDateString() === this.now.toLocaleDateString();
                });
                this.personsBdToday.sort((p1: Person, p2: Person) => {
                    let left: number = Number(p1.birthday);
                    let right: number = Number(p2.birthday);
                    return left - right;
                });
            }
        }
    }

    settingsDlg(): void {
        // open dialog for
        let config: MdDialogConfig = new MdDialogConfig();
        config.data = {
        };

        this.dialogRef = this.dialog.open(DashletEditDialogComponent, config);
        this.dialogRef.afterClosed().subscribe((result: string) => {
            // console.log(result);
            // update and refesh the person being edited
            this.dialogRef = undefined;
        });
    }

    // could become a pipe, in case momentjs does not work with AOT
    birthdayIn(birthday: string): number  {
        let bDay: Date = new Date(birthday);
        bDay.setFullYear(this.now.getFullYear());
        let interval: number = Math.floor(bDay.getTime() - this.now.getTime()) / 1000;
        let days: number = Math.floor(interval / 86400);
        return days;
    }
}
