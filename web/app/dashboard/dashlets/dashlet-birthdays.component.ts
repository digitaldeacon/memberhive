import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Person } from '../../person/person';

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

    constructor() {
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
                    return bday === this.now;
                });
                this.personsBdToday.sort((p1: Person, p2: Person) => {
                    let left: number = Number(p1.birthday);
                    let right: number = Number(p2.birthday);
                    return left - right;
                });
            }
        }
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
