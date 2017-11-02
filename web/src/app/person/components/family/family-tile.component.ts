import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person, Member, Family } from 'mh-core';
import { MatSelectChange } from '@angular/material';

@Component({
    selector: 'mh-family-tile',
    templateUrl: './family-tile.component.html',
    styleUrls: ['./family-tile.component.scss']
})
export class FamilyTileComponent {

    @Input() people: Person[];
    @Input() member: Member;
    @Input() person: Person;

    @Output() setRole: EventEmitter<Family> = new EventEmitter<Family>();
    @Output() ignoreMember: EventEmitter<Member> = new EventEmitter<Member>();
    @Output() acceptMember: EventEmitter<Member> = new EventEmitter<Member>();
    @Output() removeMember: EventEmitter<Member> = new EventEmitter<Member>();

    family: Member[] = [];

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
        const family: Family = {
            id: 'id' in this.person.family ? this.person.family.id : undefined,
            selected: memberId,
            role: $event.value
        };
        this.setRole.emit(family);
    }
}
