import { Component, Input, ViewChild, forwardRef } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatInput } from '@angular/material';
import {
    FormControl,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS } from '@angular/forms';

import {
    Tag,
    Utils
} from 'mh-core';

const CUSTOM_INPUT_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TagsComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagsComponent),
    multi: true
};

@Component({
    selector: 'mh-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    providers: [
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
    ]
})
export class TagsComponent implements ControlValueAccessor {

    @ViewChild('chipInput') chipInput: MatInput;

    @Input() source: Tag[] = [];
    @Input() _value: Tag[] = [];
    get value(): Tag[] { return this._value; }
    set value(v: Tag[]) {
        this._value = v;
        this.onChange(this._value);
    }

    onChange = (_: any): void => {
        // mock
    }
    onTouched = (_: any): void => {
        // mock
    }

    writeValue(v: Tag[]): void {
        this._value = v;
    }

    sourceFiltered(): Tag[] {
        return Utils.arrayDiffObj(this.source, this._value, 'id');
    }

    registerOnChange(fn: (_: any) => void ): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

    validate(c: FormControl): any {
        return (this._value) ? undefined : {
            tinyError: {
                valid: false
            }
        };
    }

    add(event: MatAutocompleteSelectedEvent): void {
        const t: Tag = event.option.value;
        this._value.push(t);
        this.value = this._value;
        this.chipInput['nativeElement'].blur();
    }

    addNew(input: MatInput): void {
        // create a tmp id for interaction until the api has assigned a new one
        const newId: number = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
        const newTag: Tag = {id: newId, text: input.value, type: 'status', context: ''};
        this._value.push(newTag);
        this.value = this._value;
        this.chipInput['nativeElement'].value = '';
    }

    remove(tag: Tag): void {
        this._value = this._value.filter((i: Tag) => i.id !== tag.id);
        this.value = this._value;
    }

    displayFn(value: any): string {
        return value && typeof value === 'object' ? value.text : value;
    }

}
