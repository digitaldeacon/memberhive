import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mh-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
    form: FormGroup;

    constructor(private _fb: FormBuilder) {
        this.form = this._fb.group({
            filter: ['']
        });
    }
}
