import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core';
import {LoginService} from 'app/common/auth/login.service';

@Component({
    selector: 'mh-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

    username: string;
    password: string;

    constructor(private _router: Router,
                private _loadingService: TdLoadingService,
                private loginService: LoginService
    ) {}

    login(): void {
        this.loginService.login(this.username, this.password);
        this._loadingService.register('main');
        alert('Mock log in as ' + this.username);
        setTimeout(() => {
            this._router.navigate(['/']);
            this._loadingService.resolve('main');
        }, 2000);
    }
}
