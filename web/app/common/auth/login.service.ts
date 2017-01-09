import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {Router} from '@angular/router';
import {HttpService} from "../http.service";
import {Observable} from "rxjs";
@Injectable()
export class LoginService {
    public redirectUrl: string;
    constructor(private http: HttpService, private auth: AuthService, private router: Router) {
        this.redirectUrl = '/';
    }

    public login(username: string, password: string): void {
        this.http.unauthenicatedPost(
            'login/login',
            {username: username, password: password}
        )
            .subscribe(
                (response: any) => this.storeToken(response)
            );
    }

    public isLoggedIn(): Observable<boolean> {
        if (this.auth.getToken() === undefined) {
            return Observable.of(false);
        }
        return this.http.get('site/test-login').map((e: any) => {
            return e !== "";
        });
    }

    private storeToken(response: any): void {
        this.auth.setToken(response.token);
        this.router.navigate([this.redirectUrl]);
    }

}
