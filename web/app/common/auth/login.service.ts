import {Injectable} from '@angular/core';

@Injectable()
export class LoginService {
    public login(username: string, password: string) {
        console.log(username, password);
    }
}
