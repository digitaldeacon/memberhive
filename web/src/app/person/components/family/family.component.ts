import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'mh-core';

@Component({
  selector: 'mh-person-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent implements OnInit {

    private _person: Person;

    relations: string[] = [
        'husband', 'wife', 'child', 'sibling', 'uncle',
        'aunt', 'grandmother', 'grandfather'
    ];

    @Input() person: Person;

    family: Person[] = [];
    selected: string[] = [];

    constructor() { }

    ngOnInit() {
        let names: any[] = [
            {name:'Tim '+this.person.lastName, gender:'m'},
            {name:'Anna '+this.person.lastName, gender:'f'},
            {name:'Nastia '+this.person.lastName, gender:'f'},
            {name:'Thomas '+this.person.lastName, gender:'m'}
        ];
        this.family.push(this.person);
        for(let name of names) {
            let p: Person = {
                fullName: name.name,
                gender: name.gender,
                familyRole: ''
            };
            this.family.push(p);
        }
    }

}
