import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from '@angular/router';
import {HttpService} from "../http.service";
@Injectable()
export class LoginService {

    constructor(private http:HttpService, private auth:AuthService, private router: Router,) {

    }
    public login(username: string, password: string) {
        this.http.unauthenicatedPost(
            'user/login',
            {username: username, password: password},
        )
            .subscribe(
                response => this.storeToken(response),
                (error) => console.log(error),
                () => console.log('Authentication Complete')
            );

    }

    private storeToken(response:any)
    {
        this.auth.setToken(response.token);
        this.router.navigate(['/']);
    }
}
