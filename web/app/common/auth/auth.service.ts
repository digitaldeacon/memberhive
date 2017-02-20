import { Injectable } from '@angular/core';
import { LocalStorage } from 'ng2-webstorage';
import { Person } from '../../person/person';

@Injectable()
export class AuthService {
    @LocalStorage() private token: string;
    @LocalStorage() private person: Person;

    public setToken(token: string): void {
        this.token = token;
    }

    public getToken(): string {
        return this.token;
    }

    public setPerson(person: Person): void {
        this.person = person;
    }

    public getPerson(): Person {
        return this.person;
    }
}
