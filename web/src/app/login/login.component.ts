import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {LoginService} from '../common/auth/login.service';
import {LocalStorage} from 'ng2-webstorage';

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

    login(): void {
        this.loginService.login(this.username, this.password);
    }
}
