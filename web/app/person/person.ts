
export class Person {
    public id: number;
    public firstName: string;
    public lastName: string;
    public middleName: string;
    public fullName: string;
    public email: string;
    public gender: string;
    public avatarUrlBig: string;
    public avatarUrlMedium: string;
    public avatarUrlSmall: string;
    public avatar: string;

    public deserialize(input: any): Person {
        this.id = +input.id;
        this.firstName = input.firstName;
        this.middleName = input.middleName;
        this.lastName = input.lastName;
        this.fullName = input.fullName;
        this.email = input.email;
        this.gender = input.gender;
        this.avatar = input.avatar;
        this.avatarUrlBig = input.avatarUrlBig;
        this.avatarUrlMedium = input.avatarUrlMedium;
        this.avatarUrlSmall = input.avatarUrlSmall;
        return this;
    }

    public serialize(): any {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            middleName: this.middleName,
            email: this.email,
            gender: this.gender,
            avatarUrlBig: this.avatarUrlBig,
            avatarUrlMedium: this.avatarUrlMedium,
            avatarUrlSmall: this.avatarUrlSmall,
            avatar: this.avatar
        };
    }
}
