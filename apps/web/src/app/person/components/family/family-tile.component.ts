import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Person, Member, Family, FamilyPayload, FamilyRole, familyRoleArray } from '@memberhivex/core';
import { MatSelectChange } from '@angular/material/select';

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
  @Input() family: Family;

  @Output() setRole: EventEmitter<FamilyPayload> = new EventEmitter<FamilyPayload>();
  @Output() ignoreMember: EventEmitter<Member> = new EventEmitter<Member>();
  @Output() acceptMember: EventEmitter<Member> = new EventEmitter<Member>();
  @Output() removeMember: EventEmitter<Member> = new EventEmitter<Member>();

  // TODO: move to settings
  roles: FamilyRole[] = familyRoleArray;

  accept(member: Member): void {
    this.acceptMember.emit(member);
  }

  ignore(member: Member): void {
    this.ignoreMember.emit(member);
  }

  remove(member: Member): void {
    this.removeMember.emit(member);
  }

  changeRole($event: MatSelectChange, member: Member): void {
    if (!member.isSuggestion) {
      const payload: FamilyPayload = {
        family: this.family,
        member: member.person.uid,
        role: $event.value,
        isPrimary: member.isPrimary
      };
      this.setRole.emit(payload);
    }
  }
}
