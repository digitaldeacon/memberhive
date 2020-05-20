import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

import { Person } from '@memberhivex/core';
import { DashletEditDialogComponent } from './dashlet-birthdays-edit.dialog';

import { Moment } from 'moment';
import * as _moment from 'moment';
const moment = _moment;

@Component({
  selector: 'mh-dashlet-birthdays',
  templateUrl: './dashlet-birthdays.component.html',
  styleUrls: ['./dashlet-birthdays.component.scss']
})
export class DashletBirthdaysComponent {
  private now: Moment = moment();

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
  dialogRef: MatDialogRef<any>;

  constructor(private _dialog: MatDialog, private _ref: ChangeDetectorRef) {}

  filter(people: Person[]): void {
    if (people) {
      const rangeDate: Moment = moment().add(this.range, 'days');
      this.peopleBdRange = people.filter((p: Person) => {
        const bday: Moment = moment(p.birthday);
        if (!p.birthday) {
          return false;
        }
        bday.set('year', this._contextYear(bday));
        return bday > this.now && bday < rangeDate;
      });
      this.peopleBdRange.sort((p1: Person, p2: Person) => {
        const left: Moment = moment(p1.birthday);
        const right: Moment = moment(p2.birthday);
        left.set('year', this._contextYear(left));
        right.set('year', this._contextYear(right));
        return left.unix() - right.unix();
      });
      // Filter for today's birthdays
      this.peopleBdToday = people.filter((p: Person) => {
        const bday: Moment = moment(p.birthday);
        if (!p.birthday) {
          return false;
        }
        bday.set('year', this.now.year());
        return bday.unix() === this.now.unix();
      });
      // Sort it, closest date on top
      this.peopleBdToday.sort((p1: Person, p2: Person) => {
        const left: number = moment(p1.birthday).unix();
        const right: number = moment(p2.birthday).unix();
        return left - right;
      });
    }
  }

  settingsDlg(): void {
    const config: MatDialogConfig = new MatDialogConfig();
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

  birthdayIn(birthday: string): string {
    const bday: Moment = moment(birthday);
    bday.locale('de').set('year', this._contextYear(bday));
    return bday.fromNow();
  }

  private _contextYear(d: Moment): number {
    let contextYr: number = this.now.year();
    if (d.month() < this.now.month() || (d.month() === this.now.month() && d.day() < this.now.day())) {
      contextYr += 1;
    }
    return contextYr;
  }
}
