import { Component, OnInit } from '@angular/core';

import { LoginService } from 'mh-core';
import { LocalStorage } from 'ng2-webstorage';

@Component({
    selector: 'mh-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @LocalStorage() username: string;
    password: string;
    returnUrl: string;

    constructor(private loginService: LoginService) {
    }

    ngOnInit(): void {
        this.loginService.logout();
    }

    onKey(event: KeyboardEvent): void {
        if (event.key == "Enter")
            this.login();
    }

    login(): void {
        this.loginService.login(this.username, this.password);
    }
}
