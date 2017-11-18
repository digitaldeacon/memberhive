import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Person, Member, Family, FamilyPayload } from 'mh-core';
import { MatSelectChange } from '@angular/material';

@Component({
    selector: 'mh-family-tile',
    templateUrl: './family-tile.component.html',
    styleUrls: ['./family-tile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FamilyTileComponent {

    _member: Member;
    @Input() person: Person;
    @Input() people: Person[];
    @Input() member: Member;
    /*set member(member: Member) {
        console.log('setting ... MEMBER to:', member);
        this._member = member;
    }
    get member(): Member {
        return this._member;
    }*/

    @Input() families: Family[];

    @Output() setRole: EventEmitter<FamilyPayload> = new EventEmitter<FamilyPayload>();
    @Output() ignoreMember: EventEmitter<Member> = new EventEmitter<Member>();
    @Output() acceptMember: EventEmitter<Member> = new EventEmitter<Member>();
    @Output() removeMember: EventEmitter<Member> = new EventEmitter<Member>();

    // TODO: move to settings
    relations: string[] = [
        'husband', 'wife', 'child', 'sibling', 'uncle',
        'aunt', 'grandmother', 'grandfather'
    ];

    accept(member: Member): void {
        this.acceptMember.emit(member);
    }

    ignore(member: Member): void {
        this.ignoreMember.emit(member);
    }

    remove(member: Member): void {
        this.removeMember.emit(member);
    }

    changeRole($event: MatSelectChange, memberId: string): void {
        const payload: FamilyPayload = {
            family: this.person.family,
            member: memberId,
            role: $event.value
        };
        this.setRole.emit(payload);
    }
}
