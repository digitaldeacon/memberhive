import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppState, getPeopleFilterSettings, SavePeopleFilterAction } from '@memberhivex/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'mh-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Output() filters: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  hasFilter: boolean = false;

  constructor(private _fb: FormBuilder,
              private _store: Store<AppState>,) {
    this.form = this._fb.group({
      filter: ['']
    });
    this._store.select(getPeopleFilterSettings).subscribe((filter: string) => {
      this.form.get('filter').patchValue(filter);
      this.hasFilter = !!filter;
    });
  }

  filtering(): void {
    this.filters.emit(this.form.get('filter').value);
  }

  persistFilter(): void {
    this.filters.emit(this.form.get('filter').value);
    this._store.dispatch(new SavePeopleFilterAction(this.form.get('filter').value))
  }

  saveFilter(): void {
    // TODO: turn this into a db persist action
    this._store.dispatch(new SavePeopleFilterAction(this.form.get('filter').value))
  }
}
