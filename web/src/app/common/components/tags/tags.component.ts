import { Component, Input, Output, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatInput, MatChipList } from '@angular/material';
import {
    Tag
} from 'mh-core';

@Component({
  selector: 'mh-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

    @Input() source: Array<Tag>;
    @Input() selected: Array<Tag>;

    @Output() saveSelection: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

    // @ViewChild('chipInput') focus: MatInput;

    constructor() { }

    ngOnInit() {
    }

    add(event: MatAutocompleteSelectedEvent): void {
        const t: Tag = event.option.value;
        this.selected.push(t);
        this.saveSelection.emit(this.selected);
        this.source = this.source.filter((tag: Tag) => tag.id !== t.id);
        // TODO: unset focus from input element
    }

    addNew(input: MatInput): void {
        // create a tmp id for interaction until the api has assigned a new one
        const newId: number = Math.floor(Math.random() * (100000 - 10000 +1)) + 10000;
        const newTag: Tag = {'id': newId, 'name': input.value};
        this.selected.push(newTag);
        this.saveSelection.emit(this.selected);
    }

    remove(tag: Tag): void {
        this.selected = this.selected.filter((i: Tag) => i.id !== tag.id);
        this.source.push(tag);
        this.saveSelection.emit(this.selected);
    }

    displayFn(value: any): string {
        return value && typeof value === 'object' ? value.name : value;
    }

}
