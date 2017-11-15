import { Person } from '../person/person.model';

export interface Member {
    person?: Person;
    role?: string;
    isSuggestion?: boolean;
}

export interface Family {
    id?: number;
    name?: string;
    role?: string;
    members?: string[];
    unrelated?: string[];
    selected?: string;
}
