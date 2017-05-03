import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoginService } from 'mh-core';
import { LocalStorage } from 'ng2-webstorage';

import { Store } from '@ngrx/store';
import * as app from '../app.store';
import * as auth from 'mh-core';

@Component({
    selector: 'mh-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    @LocalStorage() username: string;
    password: string;
    returnUrl: string;
    isLogged: boolean;
    subscr: Subscription;

    constructor(private loginService: LoginService,
                private _store: Store<app.AppState>) {
        /* this.subscr = this._store.select(app.getUser)
            .subscribe((data: any) => {
                console.log(data);
            }); */
    }

    ngOnInit(): void {
        this.loginService.logout();
    }

    onKey(event: KeyboardEvent): void {
        if (event.key === "Enter") {
            this.login();
        }
    }

    login(): void {
        this._store.dispatch(new auth.LoginAction ({
            username: this.username,
            password: this.password
        }));
        // TODO: mimic this behaviour after dispatch (check, redirect or present error)
        this.loginService.login(this.username, this.password);
    }

    ngOnDestroy(): void {
        // this.subscr.unsubscribe();
    }
}
