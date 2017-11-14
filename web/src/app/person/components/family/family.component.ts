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
            this.buildSuggestions();
            if (prvuid !== person.uid) {
                this.initFamily();
            }
        }
    }
    get person(): Person { return this._person; }

    @Output() updateFamily: EventEmitter<Family> = new EventEmitter<Family>(true);
    @Output() addNewFamily: EventEmitter<Family> = new EventEmitter<Family>(true);

    family: Member[] = [];
    familyId: number;
    names: any[] = [];
    suggestedMembers: Person[] = [];

    addMember: boolean = false;
    addFamily: boolean = false;

    addForm: FormGroup;
    linkForm: FormGroup;

    constructor(private _fb: FormBuilder) {
        this.addForm = this._fb.group({familyName: ['']});
        this.linkForm = this._fb.group({family: [undefined]});
    }

    initFamily(): void {
        this.family = [];
        if (this.people && 'id' in this.person.family) {
            this.familyId = this.person.family.id;
            const m: Member = {
                person: this.person,
                isSuggestion: false
            };
            this.family.push(m);
            /*this.people
                .filter((p: Person) => this.person.family.members.indexOf(p.uid) > -1)
                .map((person: Person) => {
                    if ('unrelated' in this.person.family &&
                        this.person.family.unrelated &&
                        this.person.family.unrelated.indexOf(person.uid) > -1) {
                        return;
                    }
                    if (person.uid !== this.person.uid) {
                        const member: Member = {
                            person: person,
                            isSuggestion: false
                        };
                        this.family.push(member);
                    }
                });*/
        }
        this.suggestedMembers.map((person: Person) => {
            if (person.maritalStatus === 'married') {
                person.family.role = this.person.gender === 'f' ? 'husband' : 'wife';
            } else {
                person.family.role = 'child';
            }
            const m: Member = {
                person: person,
                isSuggestion: true
            };
            this.family.push(m);
        });
    }

    buildSuggestions(): void {
        this.suggestedMembers = this.people
            .filter((person: Person) => {
                /*if ('unrelated' in this.person.family &&
                    this.person.family.unrelated &&
                    this.person.family.unrelated.indexOf(person.uid) > -1) {
                    return false;
                }*/
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
        console.log(familySelected);
        // this.person.family = familySelected;
        family = {
            id: familySelected.id,
            selected: this.person.uid,
            members: [...familySelected.members, this.person.uid]
        };
        this.updateFamily.emit(family);
    }

    ignore(m: Member): void {
        let family: Family;
        this.family = this.family
            .filter((member: Member) => member.person.uid !== m.person.uid);
        family = {
            id: this.familyId,
            selected: this.person.uid,
        /*unrelated: 'unrealted' in this.person.family
                ? [...this.person.family.unrelated, m.person.uid] : [m.person.uid]*/
        };
        this.updateFamily.emit(family);
    }

    remove(m: Member): void {
        let family: Family;
        let mem: string[];
        this.family = this.family.filter((member: Member) => member.person.uid !== m.person.uid);
        family = {
            id: this.familyId,
            selected: m.person.uid,
            members: this.family.map((member: Member) => member.person.uid)
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
