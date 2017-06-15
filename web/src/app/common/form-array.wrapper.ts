import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';

@Injectable()
export class FormArrayWrapper {
    constructor(public fa: FormArray) { }

    get(index: number) {
        return this.fa.controls[index];
    }

    splice(start: number, deleteCount: number, ...items: any[]): any[] {
        let deleted = this.fa.controls.slice(start, start + deleteCount);

        for (let i = start; i < start + deleteCount; i++) {
            this.fa.removeAt(i);
        }

        for (let i = start, j = 0; j < items.length; i++ , j++) {
            this.fa.insert(i, items[j]);
        }

        return deleted;
    }
}