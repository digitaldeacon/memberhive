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
    age: number;
    avatar: string;
    phoneHome: string;
    phoneWork: string;
    phoneMobile: string;
    user: User;
    address: any;
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

    constructor(input?: any) {
        if (input) {
            this.home = input.home ? input.home : this.home;
            this.postal = input.postal ? input.postal : this.postal;
        }
    }
}

const emptyUser: User = {
    token: '',
    personId: '',
    username: ''
};

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
    phoneHome: '',
    phoneWork: '',
    phoneMobile: '',
    user: emptyUser,
    address: PersonAddress,
    socialContact: {}
};
