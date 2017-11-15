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
