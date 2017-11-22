import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeWhile';

import { Store } from '@ngrx/store';

import {
    AppState, getFamilies,
    Person, Family, Member, FamilyPayload,
    MaritalStatus, FamilyRole, Gender,
    LinkPersonFamilyAction, IgnoreMemberFamilyAction,
    RemoveMemberFamilyAction, AddNewFamilyAction,
    SetFamilyRoleAction, AcceptMemberFamilyAction,
    UpdatePersonAction
} from 'mh-core';


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

    constructor(private _store: Store<AppState>,
                private _fb: FormBuilder) {
        this.addForm = this._fb.group({familyName: ['']});
        this.linkForm = this._fb.group({family: [undefined], role: ['']});

        // Get all current families
        this._store.select(getFamilies)
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
        this.initFamily();
        this.initMembers();
        this.buildSuggestions();
    }

    initFamily(): void {
        if (this.families) {
            this.family = this.families
                .filter((f: Family) => f.id === this.person.family.id)[0];
            this.addForm.get('familyName')
                .patchValue(this.person.lastName + '(' + this.person.firstName + ')');
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
                    if (person.maritalStatus === MaritalStatus.MARRIED) {
                        person.family.role = this.person.gender === Gender.MALE
                            ? FamilyRole.HUSBAND
                            : FamilyRole.WIFE ;
                    } else {
                        person.family.role = FamilyRole.CHILD;
                    }
                    const m: Member = {
                        person: person,
                        isSuggestion: true
                    };
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
            member: m.person.uid
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
            this._store.dispatch(new UpdatePersonAction(this.person));
            this.addFamily = false;
            this.linkForm.reset();
        }
    }

    addNew(): void {
        if (this.addForm.valid) {
            const family: Family = {
                name: this.addForm.get('familyName').value,
                members: [this.person.uid]
            };
            this._store.dispatch(new AddNewFamilyAction(family));
            this._store.dispatch(new UpdatePersonAction(this.person));
            this.addFamily = false;
            this.addForm.reset();
        }
    }

    changeRole(payload: FamilyPayload): void {
        const member: Person = this.people.find((p: Person) => p.uid === payload.member);
        this._store.dispatch(new SetFamilyRoleAction(payload));
        if (!member.maritalStatus) {
            member.maritalStatus = MaritalStatus.MARRIED;
        }
        this._store.dispatch(new UpdatePersonAction(member));
    }
}
