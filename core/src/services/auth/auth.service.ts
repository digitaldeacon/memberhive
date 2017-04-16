import { Injectable } from '@angular/core';
import { LocalStorage } from 'ng2-webstorage';
import { Person } from '../../modules/person/person.model';

@Injectable()
export class AuthService {
    @LocalStorage() private token: string;
    @LocalStorage() private currentUser: Person;

    public setToken(token: string): void {
        this.token = token;
    }

    public getToken(): string {
        return this.token;
    }

    public setCurrentUser(person: Person): void {
        this.currentUser = person;
        this.currentUser = this.currentUser; // because of issue with extension
    }

    public getCurrentUser(): Person {
        return this.currentUser;
    }
}
