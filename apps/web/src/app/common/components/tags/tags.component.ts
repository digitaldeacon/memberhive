import { Component, Input, ViewChild, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';

export interface Tag {
  id: number;
  text: string;
}

export function arrayDiffObj(s: any[], v: any[], key: string): any[] {
  const reducedIds = !v ? [] : v.map((o: any) => o[key]);
  return !s ? [] : s.filter((obj: any) => reducedIds.indexOf(obj[key]) === -1);
}

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
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class TagsComponent implements ControlValueAccessor, OnChanges {
  filteredSources: Tag[] = [];

  @ViewChild('chipInput', { static: true }) chipInput: MatInput;
  @ViewChild(MatAutocompleteTrigger, { static: true }) autoTrigger: MatAutocompleteTrigger;

  @Input() _value: Tag[] = [];
  @Input() source: Tag[] = [];
  @Input() addNew: boolean = true;

  @Input()
  set value(v: Tag[]) {
    this.onChange(v);
  }
  get value(): Tag[] {
    this.filteredSources = arrayDiffObj(this.source, this._value, 'id');
    return this._value;
  }
  @Input() placeholder: string = '';

  onChange = (_: any): void => {
    // mock
  };
  onTouched = (_: any): void => {
    // mock
  };

  writeValue(v: Tag[]): void {
    this._value = v;
    // console.log(v);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(c: FormControl): any {
    return this._value
      ? undefined
      : {
          tinyError: {
            valid: false
          }
        };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.source && (!this.chipInput || !this.chipInput.value)) {
      this.filteredSources = arrayDiffObj(this.source, this._value, 'id');
    }
  }

  textChanged(text: string): void {
    this.filteredSources = arrayDiffObj(this.source, this._value, 'id').filter(
      (obj: Tag) => obj.text.toLowerCase().indexOf(text.toLowerCase()) === 0
    );
  }

  add(event: MatAutocompleteSelectedEvent): void {
    this._addTag(event.option.value);
  }

  addTextChip(input: MatInput = this.chipInput): void {
    if (this.addNew) {
      if (input.value && !this.autoTrigger.activeOption) {
        const newId: number = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
        const newTag: Tag = { id: newId, text: input.value };
        this.source.push(newTag);
        this._addTag(newTag);
      }
    } else {
      if (this.filteredSources.length) {
        this._addTag(this.filteredSources[0]);
      }
    }
    this.chipInput['nativeElement'].value = '';
  }

  remove(tag: Tag): void {
    this._value = this._value.filter((i: Tag) => i !== tag);
    this.value = this._value;
    this.filteredSources = arrayDiffObj(this.source, this._value, 'id');
    this.chipInput['nativeElement'].blur();
  }

  selectInput(event: MouseEvent): boolean {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.textChanged(this.chipInput.value);
    this.chipInput['nativeElement'].focus();
    return false;
  }

  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.text : value;
  }

  private _addTag(value: Tag): void {
    if (!isNaN(Number(value))) {
      value = this.source.find((tag: Tag) => tag.id === Number(value));
    }
    if (!this._value) {
      this._value = [];
    }
    if (!value || !value.text || (this._value && this._value.indexOf(value) !== -1)) {
      return;
    }
    this._value.push(value);
    this.value = this._value;
    this.chipInput.value = '';
    this.filteredSources = arrayDiffObj(this.source, this._value, 'id');
    this.chipInput['nativeElement'].blur();
  }
}
