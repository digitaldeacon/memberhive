import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/takeWhile';

import { Store } from '@ngrx/store';

import {
    AppState, getFamilies,
    Person, Family, Member, Members, FamilyPayload,
    MaritalStatus, FamilyRole, familyRoleArray, Gender,
    LinkPersonFamilyAction, IgnoreMemberFamilyAction,
    RemoveMemberFamilyAction, AddNewFamilyAction,
    SetFamilyRoleAction, AcceptMemberFamilyAction,
    UpdatePersonAction
} from 'mh-core';

import { isEqual } from 'lodash';

interface MemberRole {
    role: FamilyRole;
    isPrimary: boolean;
}

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
    hasFamily$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    families: Family[];
    familyRoles: FamilyRole[] = familyRoleArray;

    suggestedMembers: Person[] = [];
    peopleNoSuggestions: Person[] = [];

    displayAddMember: boolean = false;
    displayAddFamily: boolean = false;

    addFamilyForm: FormGroup;
    addFamilyMemberForm: FormGroup;
    linkFamilyForm: FormGroup;

    constructor(private _store: Store<AppState>,
                private _fb: FormBuilder) {
        this.addFamilyForm = this._fb.group({
            familyName: ['', [<any>Validators.required]]
        });
        this.linkFamilyForm = this._fb.group({
            family: [undefined, [<any>Validators.required]],
            role: ['', [<any>Validators.required]]
        });
        this.addFamilyMemberForm = this._fb.group({
            member: ['', [<any>Validators.required]],
            role: ['', [<any>Validators.required]]
        });

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
                .filter((f: Family) => !!f.primary[this.person.uid])[0];
            this.hasFamily$.next(!!this.family);
            if (!this.family) {
                this.addFamilyForm.get('familyName')
                    .patchValue(this.person.lastName + '(' + this.person.firstName + ')');
            }
        }
    }

    initMembers(): void {
        this.members = [];
        this.members$.next(this.members);
        if (this.people && this.family) {
            const m: Member = {
                person: this.person,
                isSuggestion: false,
                role: this._role(this.person.uid),
                isPrimary: true
            };
            this.members.push(m);
            this.members$.next(this.members);
            this.people
                .filter((p: Person) => this._isPrimaryMember(p.uid))
                .map((person: Person) => this._addMember(person));
            this.people
                .filter((p: Person) => this._isMember(p.uid))
                .map((person: Person) => this._addMember(person));
        }
    }

    buildSuggestions(): void {
        if (this.family) {
            this.suggestedMembers = [];
            this.peopleNoSuggestions = [];
            this.people
                .filter((person: Person) => {
                    if (this._isPrimaryMember(person.uid) ||
                        this._isMember(person.uid) ||
                        this._isUnrelated(person.uid)) {
                        return false;
                    }
                    return (person.lastName === this.person.lastName) &&
                        (person.uid !== this.person.uid);
                })
                .map((person: Person) => {
                    const meta: MemberRole = this._defaults(person);
                    const m: Member = {
                        person: person,
                        isSuggestion: true,
                        role: meta.role,
                        isPrimary: meta.isPrimary
                    };
                    this.members.push(m);
                    this.members$.next(this.members);
                    this.suggestedMembers.push(person);
                });
            this.peopleNoSuggestions = this.people.filter((p: Person) =>
                (this.suggestedMembers.indexOf(p) === -1) &&
                (p.id !== this.person.id));
        }
    }

    addFamilyMember(): void {
        if (this.addFamilyMemberForm.valid) {
            const payload: FamilyPayload = {
                family: this.family,
                member: this.addFamilyMemberForm.get('member').value,
                role: this.addFamilyMemberForm.get('role').value
            };
            this._store.dispatch(new AcceptMemberFamilyAction(payload));
            this.displayAddMember = false;
            this.addFamilyMemberForm.reset();
        }
    }

    accept(m: Member): void {
        const payload: FamilyPayload = {
            family: this.family,
            member: m.person.uid,
            role: m.role,
            isPrimary: m.isPrimary
        };
        this._store.dispatch(new AcceptMemberFamilyAction(payload));
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
        if (this.linkFamilyForm.valid) {
            let payload: FamilyPayload;
            payload = {
                family: this.linkFamilyForm.get('family').value,
                member: this.person.uid,
                role: this.linkFamilyForm.get('role').value
            };
            this._store.dispatch(new LinkPersonFamilyAction(payload));
            this.displayAddFamily = false;
            this.linkFamilyForm.reset();
        }
    }

    addFamily(): void {
        if (this.addFamilyForm.valid) {
            const members: Members = {};
            members[this.person.uid] = {
                    role: this._defaults(this.person).role
            };
            const family: Family = {
                name: this.addFamilyForm.get('familyName').value,
                members: members
            };
            this._store.dispatch(new AddNewFamilyAction(family));
            this.displayAddFamily = false;
            this.addFamilyForm.reset();
        }
    }

    changeRole(payload: FamilyPayload): void {
        const person: Person = this.people.find((p: Person) => p.uid === payload.member);

        this._store.dispatch(new SetFamilyRoleAction(payload));
        if (!person.maritalStatus) {
            person.maritalStatus = MaritalStatus.MARRIED;
            this._store.dispatch(new UpdatePersonAction(person));
        }
    }

    private _addMember(person: Person): void {
        if (this.family && this._isUnrelated(person.uid)) {
            return;
        }
        if (person.id !== this.person.id) {
            const member: Member = {
                person: person,
                isSuggestion: false,
                role: this._role(person.uid),
                isPrimary: false
            };
            this.members.push(member);
            this.members$.next(this.members);
        }
    }
    private _isPrimaryMember(id: string): boolean {
        return 'primary' in this.family && this.family.primary
            ? !!this.family.primary[id]
            : false;
    }
    private _isMember(id: string): boolean {
        return 'members' in this.family && this.family.members
            ? !!this.family.members[id]
            : false;
    }
    private _isUnrelated(id: string): boolean {
        return 'unrelated' in this.family && this.family.unrelated
            ? this.family.unrelated.indexOf(id) > -1
            : false;
    }
    private _defaults(p: Person): MemberRole {
        const mrole: MemberRole = {
            role: FamilyRole.CHILD,
            isPrimary: true
        };
        let roleUsed: boolean = false;
        if (p.maritalStatus === MaritalStatus.MARRIED) {
            mrole.role = p.gender === Gender.MALE
                ? FamilyRole.HUSBAND
                : FamilyRole.WIFE;
            if (this.family) {
                for (const idx in this.family.primary) {
                    if (this.family.primary.hasOwnProperty(idx)) {
                        roleUsed = this.family.primary[idx].role === mrole.role;
                        if (roleUsed) {
                            mrole.isPrimary = false;
                            if ((this.person.age + 14) < p.age) {
                                mrole.role = p.gender === Gender.MALE ? FamilyRole.FATHER : FamilyRole.MOTHER;
                            } else {
                                mrole.role = p.gender === Gender.FEMALE ? FamilyRole.INLAW : FamilyRole.BROTHER;
                            }
                            break;
                        }
                    }
                }
            }
        }
        if (!roleUsed && ((this.person.age + 14) > p.age || this.person.age > (p.age - 14))) {
            // if the same address (and not married) possibly spouse
            if (isEqual(this.person.address, p.address)) {
                mrole.isPrimary = true;
                mrole.role = p.gender === Gender.MALE ? FamilyRole.HUSBAND : FamilyRole.WIFE;
            } else {
                mrole.isPrimary = false;
                mrole.role = p.gender === Gender.MALE ? FamilyRole.BROTHER : FamilyRole.SISTER;
            }
        }
        return mrole;
    }
    private _role(id: string): FamilyRole {
        let role: FamilyRole = FamilyRole.CHILD;
        role = !!this.family.primary[id] ? this.family.primary[id].role : role;
        role = !!this.family.members[id] ? this.family.members[id].role : role;
        return role;
    }
}
