import { Person } from '../person/person.model';

export interface Member {
  id?: string;
  person?: Person;
  role?: FamilyRole;
  isSuggestion?: boolean;
  isPrimary?: boolean;
}

export interface Members {
  [member: string]: Member;
}

export interface PersonFamilies {
  [person: string]: Family;
}

export interface Family {
  id?: number;
  name?: string;
  primary?: Members;
  members?: Members;
  unrelated?: string[];
}

export interface FamilyPayload {
  family: Family;
  member?: string;
  role?: FamilyRole;
  isPrimary?: boolean;
}

export enum FamilyRole {
  HUSBAND = 'husband',
  WIFE = 'wife',
  CHILD = 'child',
  MOTHER = 'mother',
  FATHER = 'father',
  BROTHER = 'brother',
  SISTER = 'sister',
  GRANDMOTHER = 'grandmother',
  GRANDFATHER = 'grandfather',
  INLAW = 'inlaw'
}

export const familyRoleArray: FamilyRole[] = [
  FamilyRole.HUSBAND,
  FamilyRole.WIFE,
  FamilyRole.CHILD,
  FamilyRole.MOTHER,
  FamilyRole.FATHER,
  FamilyRole.BROTHER,
  FamilyRole.SISTER,
  FamilyRole.INLAW,
  FamilyRole.GRANDFATHER,
  FamilyRole.GRANDMOTHER
];
