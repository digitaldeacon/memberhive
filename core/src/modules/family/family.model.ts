import { Person } from '../person/person.model';

export interface Member {
    personId?: string;
    person?: Person;
    role?: string;
    isSuggestion?: boolean;
}

export interface Family {
    id?: number;
    name?: string;
    members?: string[];
    unrelated?: string[];
}

export interface FamilyPayload {
    family: Family;
    member?: string;
    role?: string;
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