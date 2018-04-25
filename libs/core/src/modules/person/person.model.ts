import { Address, FilterSet } from '../../common/common.model';
import { Tag } from '../tags/tag.model';
import { Moment } from 'moment';
import { FamilyRole } from '../family/family.model';

export enum MaritalStatus {
  MARRIED = 'married',
  SINGLE = 'single',
  WIDOWED = 'widowed',
  DIVORCED = 'divorced',
  SEPARATED = 'separated',
  ENGAGED = 'engaged'
}

export enum UserRole {
    ADMIN = 'admin',
    MEMBER = 'member',
    STAFF = 'staff'
}

export const enum Gender {
  MALE = 'm',
  FEMALE = 'f'
}

export const maritalStatusArray: MaritalStatus[] = [
  MaritalStatus.MARRIED,
  MaritalStatus.SINGLE,
  MaritalStatus.WIDOWED,
  MaritalStatus.DIVORCED,
  MaritalStatus.SEPARATED,
  MaritalStatus.ENGAGED
];

export const userRoleArray: UserRole[] = [
    UserRole.ADMIN,
    UserRole.MEMBER,
    UserRole.STAFF
];

export interface User {
  username?: string;
  password?: string;
  role?: UserRole;
  token?: string;
  personId?: string;
  expiresAt?: Moment;
}

export interface Person {
  id?: number;
  uid?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  fullName?: string;
  email?: string;
  maritalStatus?: MaritalStatus;
  gender?: string;
  birthday?: Moment;
  baptized?: Moment;
  anniversary?: Moment;
  age?: number;
  ageFormatted?: string;
  avatar?: string;
  phoneHome?: string;
  phoneWork?: string;
  phoneMobile?: string;
  user?: User;
  address?: PersonAddress;
  socialContact?: any;
  status?: Tag[];
  familyId?: number;
  familyRole: FamilyRole;
}

export class PersonAddress {
  home: Address = {
    street: '',
    zip: '',
    city: '',
    geocode: {}
  };
  postal: Address = {
    street: '',
    zip: '',
    city: '',
    geocode: {}
  };

  constructor(input?: any) {
    if (input) {
      this.home = input.home ? input.home : this.home;
      this.postal = input.postal ? input.postal : this.postal;
    }
  }
}

export interface CalcGeoCodePayload {
  person: Person;
  apiKey?: string;
}

export interface AvatarPayload {
  image: string;
  personId: string;
}

export const personFilterSet: FilterSet[] = [
  { key: 'firstName', label: 'name' },
  { key: 'lastName', label: 'nachname' },
  { key: 'email', label: 'email' },
  { key: 'gender', label: 'sex' },
  { key: 'status', label: 'status' },
  { key: 'age', label: 'alter' }
];
