import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from '@angular/router';
import {HttpService} from "../http.service";
import {Observable} from "rxjs";
@Injectable()
export class LoginService {
    public redirectUrl: string;
    constructor(private http: HttpService, private auth: AuthService, private router: Router,) {
        this.redirectUrl = '/';
    }

    public login(username: string, password: string) {
        this.http.unauthenicatedPost(
            'login/login',
            {username: username, password: password},
        )
            .subscribe(
                response => this.storeToken(response),
                (error) => console.log(error),
                () => console.log('Authentication Complete')
            );

    }

    private storeToken(response: any) {
        this.auth.setToken(response.token);
        this.router.navigate([this.redirectUrl]);
    }

    public isLoggedIn() : Observable<boolean>{
        if(this.auth.getToken() == null)
            return Observable.of(false);
        return this.http.get('site/test-login').map(e => {
            return e != "";
        });
    }
}
