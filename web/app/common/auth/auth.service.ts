import {Injectable} from '@angular/core';
import {LocalStorage} from 'ng2-webstorage';
@Injectable()
export class AuthService {
    @LocalStorage() private token:string;

    constructor() {

    }
    public getToken() {
        return this.token;
    }
}
