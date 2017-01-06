import {Component} from '@angular/core';

import {LoginService} from 'app/common/auth/login.service';
import {LocalStorage} from 'ng2-webstorage';

@Component({
    selector: 'mh-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

    @LocalStorage() username: string;
    password: string;

    constructor(private loginService: LoginService) {
    }

    login(): void {
        this.loginService.login(this.username, this.password);
    }
}
