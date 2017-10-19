import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'mh-core';

interface Member {
    person: Person;
    isSuggestion?: boolean
}

@Component({
  selector: 'mh-person-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

    private _person: Person;

    // TODO: move to settings
    relations: string[] = [
        'husband', 'wife', 'child', 'sibling', 'uncle',
        'aunt', 'grandmother', 'grandfather'
    ];

    @Input()
    set person(person: Person) {
        if (person) {
            this._person = person;
            this.initFamily();
        }
    }
    get person(): Person { return this._person; }

    family: Member[] = [];
    names: any[] = [];

    constructor() { }

    ngOnInit(): void {
    }

    initFamily(): void {
        this.family = [{person: {}}];
        // TODO: fetch associated members from store
        this.names = [
            {name: 'Tim ' + this.person.lastName, gender: 'm'},
            {name: 'Anna ' + this.person.lastName, gender: 'f'},
            {name: 'Nastia ' + this.person.lastName, gender: 'f'},
            {name: 'Thomas ' + this.person.lastName, gender: 'm'}
        ];
        this.family.push({person: this.person});
        for (let name of this.names) {
            const randNum: number = Math.floor(Math.random() * (100000000000 - 115127539307 + 1)) + 115127539307;
            let suggested: boolean = name.gender === 'f';
            let p: Person = {
                fullName: name.name,
                gender: name.gender,
                phoneMobile: randNum.toString(),
                age: Math.floor(Math.random() * (60 - 20 + 1)) + 20,
                avatar: 'assets/images/avatar/' + name.gender + '.png'
            };
            this.family.push({person: p, isSuggestion: suggested});
        }
    }

    accept(m: Member): void {
        // TODO: update isSuggestion & write to store/db
        console.log('Accept', m);
        m.isSuggestion = false;
    }

    ignore(m: Member): void {
        // TODO: remove from array, update field 'unrelatedMembers'
        console.log('Ignore', m);
    }

    remove(m: Member) {
        // TODO: remove from array, remove from store/db, update field 'unrelatedMembers'
        console.log('Remove', m);
    }

}
