import {Injectable} from '@angular/core';
import {LocalStorage} from 'ng2-webstorage';
@Injectable()
export class AuthService {
    @LocalStorage() private token: string;

    public setToken(token: string): void {
        this.token = token;
    }

    public getToken(): string {
        return this.token;
    }

}
