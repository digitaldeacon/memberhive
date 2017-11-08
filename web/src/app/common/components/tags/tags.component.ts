import { Component, Input, ViewChild, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import {
    MatAutocompleteSelectedEvent,
    MatAutocompleteTrigger,
    MatInput
} from '@angular/material';
import {
    FormControl,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS
} from '@angular/forms';

export interface Tag {
    id: number;
    text: string;
}

export function arrayDiffObj(s: any[], v: any[], key: string) {
    let reducedIds = !v ? [] : v.map((o) => o[key]);
    return !s ? [] : s.filter((obj: any) => reducedIds.indexOf(obj[key]) === -1);
};

const CUSTOM_INPUT_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MhTagsComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MhTagsComponent),
    multi: true
};

@Component({
    selector: 'mh-tags',
    templateUrl: './tags.component.html',
    providers: [
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
    ]
})
export class MhTagsComponent implements ControlValueAccessor, OnChanges {

    private _value: Tag[] = [];

    filteredSources: Tag[] = [];

    @ViewChild('chipInput') chipInput: MatInput;
    @ViewChild(MatAutocompleteTrigger) autoTrigger: MatAutocompleteTrigger;

    @Input() source: Tag[] = [];
    @Input() addNew = true;
    @Input()
    set value(v: Tag[]) {
        this.onChange(v);
    }
    get value(): Tag[] { return this._value; }

    onChange = (_: any): void => {
        // mock
    }
    onTouched = (_: any): void => {
        // mock
    }

    writeValue(v: Tag[]): void {
        this._value = v;
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

    validate(c: FormControl): any {
        return (this._value) ? undefined : {
            tinyError: {
                valid: false
            }
        };
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.source && (!this.chipInput || !this.chipInput.value)) {
            this.filteredSources = arrayDiffObj(this.source, this._value, 'id');
        }
    }

    public textChanged(text: string) {
        this.filteredSources = arrayDiffObj(this.source, this._value, 'id')
            .filter((obj: Tag) => obj.text.toLowerCase().indexOf(text.toLowerCase()) === 0);
    }

    add(event: MatAutocompleteSelectedEvent, input: any): void {
        this.addTag(event.option.value, input);
    }

    addTextChip(input: MatInput): void {
        if (this.addNew) {
            if (input.value && !this.autoTrigger.activeOption) {
                const newId: number = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
                const newTag: Tag = { id: newId, text: input.value };
                this.source.push(newTag);
                this.addTag(newTag, input);
            }
        } else {
            if (this.filteredSources.length) {
                this.addTag(this.filteredSources[0], input);
            }
        }
    }

    remove(tag: Tag, input: any): void {
        this._value = this._value.filter((i) => i !== tag);
        this.value = this._value;
        this.filteredSources = arrayDiffObj(this.source, this._value, 'id');
        input.focus();
    }

    selectInput(event: MouseEvent, input: any) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.textChanged(input.value);
        input.focus();
        return false;
    }

    displayFn(value: any): string {
        return value && typeof value === 'object' ? value.text : value;
    }

    private addTag(value: Tag, input: any) {
        if (!isNaN(Number(value))) {
            value = this.source.find((tag) => tag.id === Number(value));
        }
        if (!value || !value.text || this._value.indexOf(value) !== -1) {
            return;
        }
        this._value.push(value);
        this.value = this._value;
        input.value = '';
        this.filteredSources = arrayDiffObj(this.source, this._value, 'id');
        input.focus();
    }

}
