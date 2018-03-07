import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  AppState,
  getPeople,
  getPeopleListSettings,
  getFamilies,
  Person,
  Tag,
  Family,
  ListFamiliesAction,
  ListPeopleAction,
  ContextButton,
  SetContextButtonsAction,
  SetTitleAction
} from '@memberhivex/core';

@Component({
  moduleId: 'mh-person',
  selector: 'mh-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonListComponent implements OnDestroy {
  private _alive: boolean = true;

  people: Person[];
  peopleFiltered: Person[];
  families: Family[];
  options: string[] = [];

  constructor(private _store: Store<AppState>) {
    this._store.dispatch(new ListPeopleAction({}));
    this._store.dispatch(new ListFamiliesAction({}));

    this._store
      .select(getPeople)
      .takeWhile(() => this._alive)
      .subscribe((people: Person[]) => {
        this.people = people;
        this.peopleFiltered = people;
      });
    this._store
      .select(getFamilies)
      .takeWhile(() => this._alive)
      .subscribe((families: Family[]) => (this.families = families));
    this._store
      .select(getPeopleListSettings)
      .takeWhile(() => this._alive)
      .subscribe((data: string[]) => {
        this.options = data;
      });
    this._setContextMenu();
    // TODO: @I18n
    this._store.dispatch(new SetTitleAction('Mitglieder auflisten'));
  }

  display(key: string): boolean {
    return this.options.indexOf(key) >= 0;
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  familyName(id: number): string {
    const fam: Family = this.families.find((f: Family) => !!f.primary[id]);
    return fam ? fam.name : '';
  }

  isFamilyMember(id: string): boolean {
    return this.families.some((f: Family) => !!f.primary[id]);
  }

  filterResults(filter: any) {
    if (filter) {
      this.peopleFiltered = this.people.filter(search, filter.split(' '));
    } else {
      this.peopleFiltered = this.people;
    }
    function search(person: Person) {
      return this.every((searchTerm: string) => {
        return person.fullName.includes(searchTerm) || person.status.some((s: Tag) => s.text.includes(searchTerm));
      });
    }
  }

  private _setContextMenu(): void {
    const buttons: ContextButton[] = [];
    // TODO: @I18n
    buttons.push({ icon: 'person_pin', link: '/person/map', title: 'KARTE' });
    buttons.push({ icon: 'person_add', link: '/person/create', title: 'HINZUFÜGEN' });

    this._store.dispatch(new SetContextButtonsAction(buttons));
  }
}
