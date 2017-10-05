import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';

export interface Tag {
    id: number;
    name: string;
}

@Component({
  selector: 'mh-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

    status: Array<Tag> = [
        {'id': 1, 'name': 'Mitglied'},
        {'id': 2, 'name': 'Besucher'},
        {'id': 3, 'name': 'Erstkontakt'},
        {'id': 4, 'name': 'regelmäßig'},
        {'id': 5, 'name': 'unregelmäßig'}
    ];
    statusSelected: Array<string> = ['test'];

    constructor() { }

    ngOnInit() {
    }

    addStatus(event: MatAutocompleteSelectedEvent): void {
        this.statusSelected.push(this.status.find((t: Tag) => t.id === event.option.value).name);
    }
    removeStatus(status: any): void {
        this.statusSelected = this.statusSelected.filter((i:any) => i !== status);
    }

}
