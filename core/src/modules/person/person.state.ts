export interface PersonState {
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

export let initialPersonState: PersonState = {
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
}

export interface PersonAddress {
    home: any;
    postal: any;
}
