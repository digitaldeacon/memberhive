import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { Person, Family, Member } from 'mh-core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'mh-person-family',
    templateUrl: './family.component.html',
    styleUrls: ['./family.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyComponent {

    private _person: Person;

    @Input() people: Person[];
    @Input() families: Family[];
    @Input()
    set person(person: Person) {
        if (person) {
            const prvuid: string = !this._person ? '' : this._person.uid;
            this._person = person;
            this.family = this.families.filter((f: Family) => f.id === this.person.family.id)[0];
            this.buildSuggestions();
            if (prvuid !== person.uid) {
                this.initFamily();
            }
        }
    }
    get person(): Person { return this._person; }

    @Output() updateFamily: EventEmitter<Family> = new EventEmitter<Family>(true);
    @Output() addNewFamily: EventEmitter<Family> = new EventEmitter<Family>(true);

    members: Member[] = [];
    family: Family;
    names: any[] = [];
    suggestedMembers: Person[] = [];

    addMember: boolean = false;
    addFamily: boolean = false;

    addForm: FormGroup;
    linkForm: FormGroup;

    relations: string[] = [
        'husband', 'wife', 'child', 'sibling', 'uncle',
        'aunt', 'grandmother', 'grandfather'
    ];

    constructor(private _fb: FormBuilder) {
        this.addForm = this._fb.group({familyName: ['']});
        this.linkForm = this._fb.group({family: [undefined], role: ['']});
    }

    initFamily(): void {
        this.members = [];
        if (this.people && 'id' in this.person.family) {
            const m: Member = {
                person: this.person,
                isSuggestion: false
            };
            this.members.push(m);
            console.log(this.families, this.person);
            console.log(this.members, this.family);
            this.people
                .filter((p: Person) => this.family.members.indexOf(p.uid) > -1)
                .map((person: Person) => {
                    if (this.family.unrelated &&
                        this.family.unrelated.indexOf(person.uid) > -1) {
                        return;
                    }
                    if (person.id !== this.person.id) {
                        const member: Member = {
                            person: person,
                            isSuggestion: false
                        };
                        this.members.push(member);
                    }
                });
        }
        this.suggestedMembers.map((person: Person) => {
            if (person.maritalStatus === 'married') {
                person.family.role = this.person.gender === 'm' ? 'husband' : 'wife';
            } else {
                person.family.role = 'child';
            }
            const m: Member = {
                person: person,
                isSuggestion: true
            };
            this.members.push(m);
        });
    }

    buildSuggestions(): void {
        this.suggestedMembers = this.people
            .filter((person: Person) => {
                if (this.family.unrelated &&
                    this.family.unrelated.indexOf(person.uid) > -1) {
                    return false;
                }
                if (this.family.members &&
                    this.family.members.indexOf(person.uid) > -1) {
                    return false;
                }
                return (person.lastName === this.person.lastName) &&
                    (person.uid !== this.person.uid);
        });
        this.addForm.get('familyName').patchValue(this.person.lastName);
    }

    accept(m: Member): void {
        // TODO: update isSuggestion & write to store/db
        // console.log('Accept', m);
        m.isSuggestion = false;
    }

    link(): void {
        let family: Family;
        let familySelected: Family = this.linkForm.get('family').value;
        family = {
            id: familySelected.id,
            selected: this.person.uid,
            members: [...familySelected.members, this.person.uid]
        };
        this.updateFamily.emit(family);
    }

    ignore(m: Member): void {
        let family: Family;
        family = {
            id: this.family.id,
            selected: this.person.uid,
            unrelated: 'unrelated' in this.family
                ? [...this.family.unrelated, m.person.uid] : [m.person.uid]
        };
        this.updateFamily.emit(family);
    }

    remove(m: Member): void {
        let family: Family;
        let mem: string[];
        this.members = this.members.filter((member: Member) => member.person.uid !== m.person.uid);
        family = {
            id: this.family.id,
            selected: m.person.uid,
            members: this.members.map((member: Member) => member.person.uid)
        };
        this.updateFamily.emit(family);
    }

    addFormSave(): void {
        const family: Family = {
            name: this.addForm.get('familyName').value,
            members: [this.person.uid]
        };
        this.addNewFamily.emit(family);
    }

    setRole($event: Family): void {
        this.updateFamily.emit($event);
    }
}
