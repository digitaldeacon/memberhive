import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    private reurl: string;
    public set redirectUrl(url: string) {
        this.reurl = url;
    }
    public get redirectUrl(): string {
        return this.reurl;
    }

    constructor(private http: HttpService,
                private auth: AuthService,
                private router: Router,
                private route: ActivatedRoute) {
        this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
    }

    /**
     * @deprecated will be removed when the store is complete
     */
    public login(username: string, password: string): void {
        this.http.unauthenticatedPost(
            'login/login',
            {username: username, password: password}
        )
            .subscribe(
                (response: any) => this.store(response)
            );
    }

    public isLoggedIn(): Observable<boolean> {
        if (this.auth.getToken() === undefined) {
            return Observable.of(false);
        }
        return this.http.get('site/test-login').map((e: any) => {
            return e !== '';
        });
    }

    /**
     * @deprecated will be removed when the store is complete
     */
    public logout(): void {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
    }

    /**
     * @deprecated will be removed when the store is complete
     */
    private store(response: any): void {
        this.auth.setToken(response.user.token);
        if (response.user.person) {
            this.auth.setCurrentUser(response.user.person);
        }
        this.router.navigate([this.redirectUrl]);
    }
}
