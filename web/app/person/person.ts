export class Person {
    public id: number;
    public uid: string;
    public firstName: string;
    public lastName: string;
    public middleName: string;
    public fullName: string;
    public email: string;
    public maritalStatus: string;
    public gender: string;
    public birthday: Date;
    public age: number;
    public avatar: string;
    public username: string;
    public phoneHome: string;
    public phoneWork: string;
    public phoneMobile: string;
    // Objects
    public user: any;
    public address: PersonAddress;
    public socialContact: any;

    public deserialize(input: any): Person {
        this.id = input.id;
        this.uid = input.uid;
        this.firstName = input.firstName;
        this.middleName = input.middleName;
        this.lastName = input.lastName;
        this.fullName = input.fullName;
        this.email = input.email;
        this.gender = input.gender;
        this.birthday = new Date(input.birthday);
        this.age = input.age;
        this.maritalStatus = input.maritalStatus;
        this.avatar = input.avatar;
        this.username = input.username;
        this.user = input.user;
        this.address = JSON.parse(input.address);
        this.socialContact = JSON.parse(input.socialContact);
        this.phoneHome = input.phoneHome;
        this.phoneMobile = input.phoneMobile;
        this.phoneWork = input.phoneWork;
        return this;
    }

    public serialize(): any {
        return {
            id: this.id,
            uid: this.uid,
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            email: this.email,
            gender: this.gender,
            maritalStatus: this.maritalStatus,
            birthday: this.birthday,
            address: this.address,
            user: this.user
        };
    }
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
