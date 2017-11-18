import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import {
    Person, Family, Member, FamilyPayload,
    LinkPersonFamilyAction, IgnoreMemberFamilyAction,
    RemoveMemberFamilyAction, AddNewFamilyAction,
    SetFamilyRoleAction, AcceptMemberFamilyAction,
    UpdatePersonAction
} from 'mh-core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeWhile';

import { Store } from '@ngrx/store';
import * as app from '../../../app.store';

@Component({
    selector: 'mh-person-family',
    templateUrl: './family.component.html',
    styleUrls: ['./family.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyComponent implements OnDestroy {

    private _person: Person;
    private _alive: boolean = true;

    @Input() people: Person[];
    @Input()
    set person(person: Person) {
        // console.log('setting ... PERSON to:', person);
        this._person = person;
        this.build();
    }
    get person(): Person { return this._person; }

    members: Member[] = [];
    members$: BehaviorSubject<Member[]> = new BehaviorSubject<Member[]>([]);

    family: Family;
    families: Family[];

    suggestedMembers: Person[] = [];

    addMember: boolean = false;
    addFamily: boolean = false;

    addForm: FormGroup;
    linkForm: FormGroup;

    relations: string[] = [
        'husband', 'wife', 'child', 'sibling', 'uncle',
        'aunt', 'grandmother', 'grandfather'
    ];

    constructor(private _store: Store<app.AppState>,
                private _fb: FormBuilder) {
        this.addForm = this._fb.group({familyName: ['']});
        this.linkForm = this._fb.group({family: [undefined], role: ['']});

        // Get all current families
        this._store.select(app.getFamilies)
            .takeWhile(() => this._alive)
            .subscribe((families: Family[]) => {
                this.families = families;
                if (this.person) {
                    this.build();
                }
            });
    }

    ngOnDestroy(): void {
        this._alive = false;
    }

    build(): void {
        // console.log('building ...');
        this.initFamily();
        this.initMembers();
        this.buildSuggestions();
    }

    initFamily(): void {
        if (this.families) {
            this.family = this.families
                .filter((f: Family) => f.id === this.person.family.id)[0];
            // console.log('setting ... FAMILY to:', this.family);
            this.addForm.get('familyName').patchValue(this.person.lastName);
        }
    }

    initMembers(): void {
        this.members = [];
        this.members$.next(this.members);
        if (this.people && 'id' in this.person.family) {
            const m: Member = {
                person: this.person,
                isSuggestion: false
            };
            this.members.push(m);
            this.members$.next(this.members);
            this.people
                .filter((p: Person) => this.family.members.indexOf(p.uid) > -1)
                .map((person: Person) => {
                    if (this.family &&
                        this.family.unrelated &&
                        this.family.unrelated.indexOf(person.uid) > -1) {
                        return;
                    }
                    if (person.id !== this.person.id) {
                        const member: Member = {
                            person: person,
                            isSuggestion: false
                        };
                        this.members.push(member);
                        this.members$.next(this.members);
                    }
                });
        }
    }

    buildSuggestions(): void {
        if (this.family) {
            this.people
                .filter((person: Person) => {
                    if (this.family &&
                        this.family.unrelated &&
                        this.family.unrelated.indexOf(person.uid) > -1) {
                        return false;
                    }
                    if (this.family &&
                        this.family.members &&
                        this.family.members.indexOf(person.uid) > -1) {
                        return false;
                    }
                    return (person.lastName === this.person.lastName) &&
                        (person.uid !== this.person.uid);
                })
                .map((person: Person) => {
                    if (person.maritalStatus === 'married') {
                        person.family.role = this.person.gender === 'm' ? 'husband' : 'wife';
                    } else {
                        person.family.role = 'child';
                    }
                    const m: Member = {
                        person: person,
                        isSuggestion: true
                    };
                    // console.log('[SUG] pushing to members...', m);
                    this.members.push(m);
                    this.members$.next(this.members);
                });
        }
    }

    accept(m: Member): void {
        const payload: FamilyPayload = {
            family: this.family,
            member: m.person.uid
        };
        this._store.dispatch(new AcceptMemberFamilyAction(payload));
        m.person.family = {
            id: this.family.id,
            role: m.role
        };
        this._store.dispatch(new UpdatePersonAction(m.person));
    }

    ignore(m: Member): void {
        const payload: FamilyPayload = {
            family: this.family,
            member: this.person.uid
        };
        this._store.dispatch(new IgnoreMemberFamilyAction(payload));
    }

    remove(m: Member): void {
        let payload: FamilyPayload;
        payload = {
            family: this.family,
            member: m.person.uid
        };
        this._store.dispatch(new RemoveMemberFamilyAction(payload));
        m.person.family = {
            id: undefined,
            role: ''
        };
        this._store.dispatch(new UpdatePersonAction(m.person));
    }

    link(): void {
        if (this.linkForm.valid) {
            let payload: FamilyPayload;
            payload = {
                family: this.linkForm.get('family').value,
                member: this.person.uid,
                role: this.linkForm.get('role').value
            };
            this._store.dispatch(new LinkPersonFamilyAction(payload));
            this.person.family = {
                id: this.linkForm.get('family').value.id
            };
            this._store.dispatch(new UpdatePersonAction(this.person));
            this.addFamily = false;
            this.linkForm.reset();
        }
    }

    addFormSave(): void {
        if (this.addForm.valid) {
            const family: Family = {
                name: this.addForm.get('familyName').value,
                members: [this.person.uid]
            };
            this._store.dispatch(new AddNewFamilyAction(family));
            this.addFamily = false;
            this.addForm.reset();
        }
    }

    changeRole(payload: FamilyPayload): void {
        this._store.dispatch(new SetFamilyRoleAction(payload));
    }
}
