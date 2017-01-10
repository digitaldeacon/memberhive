
export class Person {
    public id: number;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public avatarUrlBig: string;
    public avatarUrlMedium: string;
    public avatarUrlSmall: string;

    public deserialize(input: any): Person {
        this.id = +input.id;
        this.firstName = input.firstName;
        this.lastName = input.lastName;
        this.fullName = input.fullName;
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
            avatarUrlBig: this.avatarUrlBig,
            avatarUrlMedium: this.avatarUrlMedium,
            avatarUrlSmall: this.avatarUrlSmall
        };
    }
}
