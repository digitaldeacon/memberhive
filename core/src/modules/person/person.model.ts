import { Address } from '../../common/common.model';

export interface User {
    token: string;
    personId: string;
    username: string;
    password?: string;
}

export interface Person {
    id: number;
    uid: string;
    firstName: string;
    lastName: string;
    middleName: string;
    fullName: string;
    email: string;
    maritalStatus: string;
    gender: string;
    birthday: Date;
    baptized: Date;
    anniversary: Date;
    age: number;
    avatar: string;
    phoneHome: string;
    phoneWork: string;
    phoneMobile: string;
    user: User;
    address: PersonAddress;
    socialContact: any;
}

export class PersonAddress {
    home: Address = {
        street: '',
        zip: '',
        city: ''
    };
    postal: Address = {
        street: '',
        zip: '',
        city: ''
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