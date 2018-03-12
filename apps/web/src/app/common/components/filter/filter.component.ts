import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppState, getPeopleFilterSettings, SavePeopleFilterAction, PersistPeopleFilterAction } from '@memberhivex/core';
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
  savedFilters: string[] = [];

  constructor(private _fb: FormBuilder, private _store: Store<AppState>) {
    this.form = this._fb.group({
      filter: ['']
    });
    this._store.select(getPeopleFilterSettings).subscribe((filter: any) => {
      console.log(filter);
      if (filter.hasOwnProperty('filters') && filter.filters.length > 0) {
        this.savedFilters = filter.filters;
      }
      // this.form.get('filter').patchValue(filter);
      // this.hasFilter = !!filter;
    });
  }

  filtering(): void {
    this.filters.emit(this.form.get('filter').value);
    setTimeout(() => {
        this._store.dispatch(new PersistPeopleFilterAction(this.form.get('filter').value));
    }, 500)
  }

  // persists the filter in memory
  persistFilter(): void {
    this.filters.emit(this.form.get('filter').value);
    this._store.dispatch(new PersistPeopleFilterAction(this.form.get('filter').value));
  }

  // saves the filter to the Db as a personal filter
  saveFilter(): void {
    this._store.dispatch(new SavePeopleFilterAction(this.form.get('filter').value));
  }
}
