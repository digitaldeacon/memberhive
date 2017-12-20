import { Address } from '../../common/common.model';
import { Tag } from '../tags/tag.model';
import { Moment } from 'moment'

export enum MaritalStatus {
    MARRIED = 'married',
    SINGLE = 'single',
    WIDOWED = 'widowed',
    DIVORCED = 'divorced',
    SEPARATED = 'separated',
    ENGAGED = 'engaged'
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

export interface User {
    token: string;
    personId: string;
    username?: string;
    password?: string;
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
    avatar?: string;
    phoneHome?: string;
    phoneWork?: string;
    phoneMobile?: string;
    user?: User;
    address?: PersonAddress;
    socialContact?: any;
    status?: Tag[];
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
