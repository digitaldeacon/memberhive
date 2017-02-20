
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
    public birthday: string;
    public avatarUrlBig: string;
    public avatarUrlMedium: string;
    public avatarUrlSmall: string;
    public avatar: string;
    public username: string;
    public password: string;
    public user: Object = {};

    public deserialize(input: any): Person {
        this.id = input.id;
        this.uid = input.uid;
        this.firstName = input.firstName;
        this.middleName = input.middleName;
        this.lastName = input.lastName;
        this.fullName = input.fullName;
        this.email = input.email;
        this.gender = input.gender;
        this.birthday = input.birthday;
        this.maritalStatus = input.maritalStatus;
        this.avatar = input.avatar;
        this.avatarUrlBig = input.avatarUrlBig;
        this.avatarUrlMedium = input.avatarUrlMedium;
        this.avatarUrlSmall = input.avatarUrlSmall;
        this.username = input.username;
        this.password = input.password;
        this.user = input.user;
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
            avatarUrlBig: this.avatarUrlBig,
            avatarUrlMedium: this.avatarUrlMedium,
            avatarUrlSmall: this.avatarUrlSmall
        };
    }
}
