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
    age: number;
    avatar: string;
    username: string;
    phoneHome: string;
    phoneWork: string;
    phoneMobile: string;
    user: any;
    address: PersonAddress;
    socialContact: any;
}

export class PersonAddress {
    home: any = {
        street: '',
        zip: '',
        city: '',
        geocode: {}
    };
    postal: any = {
        street: '',
        zip: '',
        city: '',
        geocode: {}
    };

    constructor(input: any) {
        if (input) {
            this.home = input.home ? input.home : this.home;
            this.postal = input.postal ? input.postal : this.postal;
        }
    }
}

export const emptyPerson: Person = {
    id: 0,
    uid: '',
    firstName: '',
    lastName: '',
    middleName: '',
    fullName: '',
    email: '',
    maritalStatus: '',
    gender: '',
    birthday: undefined,
    age: 0,
    avatar: '',
    username: '',
    phoneHome: '',
    phoneWork: '',
    phoneMobile: '',
    user: {},
    address: {
    home: {},
    postal: {}
    },
    socialContact: {}
};
