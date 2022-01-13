import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import {
  AppState,
  getPeopleFilterSettings,
  SavePeopleFilterAction,
  PersistPeopleFilterAction,
  DeletePeopleFilterAction,
  Filter,
} from '@memberhivex/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'mh-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  @Output() filters: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  hasFilter: boolean = false;
  savedFilters: string[] = [];

  constructor(private _fb: FormBuilder, private _store: Store<AppState>) {
    this.form = this._fb.group({
      filter: [''],
    });
    this._store.select(getPeopleFilterSettings).subscribe((filter: any) => {
      if (filter) {
        if (filter.hasOwnProperty('saved') && filter.saved.length > 0) {
          this.savedFilters = filter.saved;
        }
        this.form.get('filter').patchValue(filter.term);
        this.hasFilter = !!filter.term;
      }
    });
  }

  filtering(): void {
    this.filters.emit(this.activeFilter());
    setTimeout(() => {
      this._store.dispatch(new PersistPeopleFilterAction(this.activeFilter()));
    }, 500);
  }

  // persists the filter in memory accross pages
  persistFilter(): void {
    this.filters.emit(this.activeFilter());
    this._store.dispatch(new PersistPeopleFilterAction(this.activeFilter()));
  }

  // saves the filter to the Db as a personal filter
  saveFilter(): void {
    this._store.dispatch(new SavePeopleFilterAction(this.filterPayload()));
  }

  setFilter(filter: any, $event: any): void {
    const filterValue: string = this.activeFilter() !== filter ? filter : '';
    if ($event.srcElement.tagName === 'MAT-CHIP') {
      this.form.get('filter').patchValue(filterValue);
      this.filters.emit(filterValue);
      this._store.dispatch(new PersistPeopleFilterAction(filterValue));
    }
  }

  deleteFilter(filter: any): void {
    this._store.dispatch(new DeletePeopleFilterAction(filter));
    if (this.activeFilter() === filter) {
      this.form.get('filter').patchValue('');
    }
  }

  activeFilter(): string {
    return this.form.get('filter').value;
  }

  highlightSelected(filter: string): string {
    return this.isSelectedFilter(filter) ? 'accent' : 'default';
  }

  isSelectedFilter(filter: string): boolean {
    return this.activeFilter() === filter;
  }

  isSaveable(): boolean {
    return this.activeFilter() ? this.savedFilters.some((term: string) => term === this.activeFilter()) : false;
  }

  private filterPayload(): Filter {
    return {
      term: this.activeFilter(),
      saved: this.savedFilters,
    };
  }
}
